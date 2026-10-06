import matplotlib.pyplot as plt
import numpy as np
import os
import json

def generate_figure_graph(output_path="models/figure3_graph.png", metrics_path="models/metrics.json"):
    print("Generating Figure 3 Grouped Bar Chart Image...")
    
    categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4']
    series1 = [4.3, 2.5, 3.5, 4.5]
    series2 = [2.4, 4.4, 1.8, 2.8]
    series3 = [2.0, 2.0, 3.0, 5.0]

    series1_label = "Series 1 (Precision)"
    series2_label = "Series 2 (Recall)"
    series3_label = "Series 3 (F1 Score)"

    if os.path.exists(metrics_path):
        with open(metrics_path, "r") as f:
            data = json.load(f)
            if "benchmark_table" in data:
                rows = data["benchmark_table"]["rows"][:4]
                categories = [r["model"].replace(" Classifier", "") for r in rows]
                series1 = [r["precision"] * 5 for r in rows]  # Scaled for 0-6 chart axis
                series2 = [r["recall"] * 5 for r in rows]
                series3 = [r["f1_score"] * 5 for r in rows]

    x = np.arange(len(categories))
    width = 0.25  # Bar width

    fig, ax = plt.subplots(figsize=(10, 5.5), dpi=300)

    # Colors matching reference image Figure 3
    c_series1 = '#2B549A'  # Dark Royal Blue
    c_series2 = '#E67E22'  # Warm Orange
    c_series3 = '#5B9BD5'  # Sky Blue

    rects1 = ax.bar(x - width, series1, width, label=series1_label, color=c_series1)
    rects2 = ax.bar(x, series2, width, label=series2_label, color=c_series2)
    rects3 = ax.bar(x + width, series3, width, label=series3_label, color=c_series3)

    # Styling axes and title
    ax.set_title("Chart Title", fontsize=18, pad=20, fontfamily='sans-serif', color='#4A4A4A')
    ax.set_xticks(x)
    ax.set_xticklabels(categories, fontsize=12, color='#4A4A4A', fontfamily='sans-serif')
    ax.set_ylim(0, 6)
    
    # Y-axis ticks and horizontal gridlines only
    ax.yaxis.grid(True, linestyle='-', linewidth=0.8, color='#E0E0E0')
    ax.xaxis.grid(False)
    ax.set_axisbelow(True)

    # Remove top and right spines
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['left'].set_color('#CCCCCC')
    ax.spines['bottom'].set_color('#CCCCCC')

    # Legend at bottom center
    ax.legend(loc='upper center', bbox_to_anchor=(0.5, -0.15),
              ncol=3, frameon=False, fontsize=11)

    # Figure 3 Caption at bottom left
    fig.text(0.08, 0.02, "Figure 3. Label in 24pt Calibri.", 
             fontsize=12, fontweight='bold', fontfamily='sans-serif', color='#000000')

    plt.tight_layout()
    plt.subplots_adjust(bottom=0.25)
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    plt.savefig(output_path, bbox_inches='tight', dpi=300)
    plt.close()
    print(f"Figure 3 Graph image generated and saved to {output_path}")

if __name__ == "__main__":
    generate_figure_graph()
