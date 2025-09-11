"""
BLAST Tool using Biopython
"""

import os
import csv
import requests
from datetime import datetime
from Bio.Blast import NCBIWWW, NCBIXML

def check_ncbi_server(url="https://blast.ncbi.nlm.nih.gov/Blast.cgi"):
    """Check if NCBI BLAST server is reachable"""
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            return True
        else:
            print(f"Server responded with status code: {response.status_code}")
            return False
    except Exception as e:
        print("Unable to reach NCBI BLAST server:", e)
        return False

def validate_sequence(sequence, seq_type):
    """Validate sequence based on type"""
    if seq_type == "dna" or seq_type == "rna":
        valid_chars = set("ATGCN" if seq_type == "dna" else "AUGCN")
    elif seq_type == "protein":
        valid_chars = set("ACDEFGHIKLMNPQRSTVWYBXZ")  # standard + ambiguous
    else:
        return False
    
    return all(base in valid_chars for base in sequence)

def run_blast(sequence, program="blastn", database="nr", hitlist_size=10):
    try:
        print(f"\nRunning {program} against {database} database...")
        result_handle = NCBIWWW.qblast(program, database, sequence, hitlist_size=hitlist_size)

        blast_records = NCBIXML.parse(result_handle)
        results = []

        for blast_record in blast_records:
            for alignment in blast_record.alignments:
                for hsp in alignment.hsps:
                    results.append({
                        "title": alignment.title,
                        "length": alignment.length,
                        "e_value": hsp.expect,
                        "score": hsp.score,
                        "identities": hsp.identities,
                        "query_start": hsp.query_start,
                        "query_end": hsp.query_end,
                    })

        return results[:hitlist_size]

    except Exception as e:
        print("Error running BLAST:", e)
        return []

def save_results(results, filename, filetype="txt"):
    """Save results to TXT or CSV"""
    if filetype == "txt":
        with open(filename, "w") as f:
            if results:
                for i, r in enumerate(results, 1):
                    f.write(f"Result {i}:\n")
                    f.write(f"Title: {r['title']}\n")
                    f.write(f"Length: {r['length']}\n")
                    f.write(f"E-value: {r['e_value']}\n")
                    f.write(f"Score: {r['score']}\n")
                    f.write(f"Identities: {r['identities']}\n")
                    f.write(f"Query range: {r['query_start']} - {r['query_end']}\n")
                    f.write("-"*40 + "\n")
            else:
                f.write("No results found.\n")

    elif filetype == "csv":
        with open(filename, "w", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=["title", "length", "e_value", "score", "identities", "query_start", "query_end"])
            writer.writeheader()
            writer.writerows(results if results else [])
    
    print(f"\n✅ Results saved as {os.path.basename(filename)} at {os.path.abspath(filename)}")


if __name__ == "__main__":
    if not check_ncbi_server():
        print("NCBI BLAST server is not reachable. Try again later.")
        exit()

    # Step 1: Job name (optional)
    job_name = input("Enter job name (optional): ").strip()
    if not job_name:
        job_name = "BLAST_result"

    # Step 2: Sequence type
    seq_type = input("Enter sequence type (DNA/RNA/Protein): ").strip().lower()

    # Step 3: Sequence
    sequence = input("Enter your sequence: ").strip().upper()

    if not validate_sequence(sequence, seq_type):
        print("❌ Invalid sequence for given type.")
        exit()

    # Step 4: BLAST program choice
    print("\nAvailable BLAST programs:")
    print("1. blastn   (DNA/RNA → DNA)")
    print("2. blastp   (Protein → Protein)")
    print("3. blastx   (DNA/RNA → Protein)")
    print("4. tblastn  (Protein → DNA)")
    print("5. tblastx  (DNA/RNA → Translated DNA)")

    program_choice = input("Choose a BLAST program (1-5): ").strip()
    program_map = {"1": "blastn", "2": "blastp", "3": "blastx", "4": "tblastn", "5": "tblastx"}
    program = program_map.get(program_choice, "blastn")

    # Step 5: Database choice
    print("\nAvailable databases:")
    print("1. nr (Non-redundant protein/nucleotide)")
    print("2. nt (Nucleotide collection)")
    print("3. refseq_protein (RefSeq proteins)")
    print("4. refseq_rna (RefSeq RNAs)")
    print("5. pdb (Protein Data Bank sequences)")

    db_choice = input("Choose a database (1-5): ").strip()
    db_map = {"1": "nr", "2": "nt", "3": "refseq_protein", "4": "refseq_rna", "5": "pdb"}
    database = db_map.get(db_choice, "nr")

    # Step 6: Number of hits
    try:
        hitlist_size = int(input("\nEnter number of hits you want (default 10): ").strip())
    except ValueError:
        hitlist_size = 10

    # Step 7: Run BLAST
    results = run_blast(sequence, program=program, database=database, hitlist_size=hitlist_size)

    # Step 8: Show results
    if results:
        print(f"\nTop {len(results)} results for {program} against {database}:")
        for i, r in enumerate(results, 1):
            print(f"\nResult {i}:")
            print(f"Title: {r['title']}")
            print(f"Length: {r['length']}")
            print(f"E-value: {r['e_value']}")
            print(f"Score: {r['score']}")
            print(f"Identities: {r['identities']}")
            print(f"Query range: {r['query_start']} - {r['query_end']}")
    else:
        print("No results found.")

    # Step 9: Output file type
    filetype = input("\nChoose output file type (txt/csv): ").strip().lower()
    if filetype not in ["txt", "csv"]:
        print("Invalid file type. Defaulting to txt.")
        filetype = "txt"

    # Step 10: File save path
    save_path = input("Enter folder path to save file (leave blank for current directory): ").strip()
    if not save_path:
        save_path = os.getcwd()  # current directory
    if not os.path.exists(save_path):
        print("Invalid path. Using current directory instead.")
        save_path = os.getcwd()

    # Step 11: Add timestamp to filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = os.path.join(save_path, f"{job_name}_{timestamp}.{filetype}")

    save_results(results, filename, filetype)   # Step 12: Save results