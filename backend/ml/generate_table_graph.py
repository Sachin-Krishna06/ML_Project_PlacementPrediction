import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import os
import json

def generate_table_graph(output_path="models/table1_graph.png", metrics_path="models/metrics.json"):
    print("Generating Table 1 Graph Image...")
    
    headers = ["Item", "Heading 1", "Heading 2", "Heading 3"]
    cell_data = [
        ["Model A", "800", "790", "4001"],
        ["Model B", "356", "856", "290"],
        ["Model C", "228", "134", "238"],
        ["Model D", "954", "875", "976"],
        ["Model E", "324", "325", "301"],
    ]
    total_row = ["Total", "199", "137", "186"]

    if os.path.exists(metrics_path):
        with open(metrics_path, "r") as f:
            data = json.load(f)
            if "benchmark_table" in data:
                bt = data["benchmark_table"]
                headers = bt["headers"][:4]  # First 4 columns for compact view
                cell_data = []
                for row in bt["rows"]:
                    cell_data.append([
                        row["model"],
                        str(row["accuracy"]),
                        str(row["precision"]),
                        str(row["f1_score"])
                    ])
                tot = bt["total_summary"]
                total_row = [tot["model"], str(tot["accuracy"]), str(tot["precision"]), str(tot["f1_score"])]

    all_data = cell_data + [total_row]

    # Plot creation matching Calibri / corporate visual style
    fig, ax = plt.subplots(figsize=(9, 5), dpi=300)
    ax.axis('off')
    ax.axis('tight')

    # Title label at the top
    plt.title("Table 1. Model Performance & Algorithm Matrix.", 
              fontsize=18, fontweight='bold', fontfamily='sans-serif', loc='left', pad=15, color='#1E293B')

    table = ax.table(
        cellText=all_data,
        colLabels=headers,
        cellLoc='center',
        loc='center'
    )

    table.auto_set_font_size(False)
    table.set_fontsize(11)
    table.scale(1.2, 2.0)

    header_color = '#2A5298'  # Deep royal blue matching reference image
    zebra_even = '#E8F1FD'    # Soft blue alternating
    zebra_odd = '#DDE7F6'     # Slightly deeper soft blue alternating
    total_color = '#C9DDF7'   # Total row background

    # Formatting cells & borders
    for key, cell in table.get_celld().items():
        row, col = key
        cell.set_edgecolor('#FFFFFF')  # Crisp white borders
        cell.set_linewidth(1.5)
        
        if row == 0:
            cell.set_facecolor(header_color)
            cell.get_text().set_color('#FFFFFF')
            cell.get_text().set_weight('bold')
            cell.get_text().set_fontsize(12)
        elif row == len(all_data):
            cell.set_facecolor(total_color)
            cell.get_text().set_color('#0F172A')
            cell.get_text().set_weight('bold')
        else:
            if row % 2 == 0:
                cell.set_facecolor(zebra_even)
            else:
                cell.set_facecolor(zebra_odd)
            cell.get_text().set_color('#1E293B')
            if col == 0:
                cell.get_text().set_color('#0F172A')

    plt.tight_layout()
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    plt.savefig(output_path, bbox_inches='tight', dpi=300)
    plt.close()
    print(f"Table 1 Graph image generated and saved to {output_path}")

if __name__ == "__main__":
    generate_table_graph()
