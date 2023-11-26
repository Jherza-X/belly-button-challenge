# belly-button-challenge
Challenge Module 14, Data Visualization Boot camp UofT

# Belly Button Biodiversity Dashboard

This project is a web-based dashboard that visualizes belly button biodiversity data for the Challege 14 od UofT data visualization bootcamp. It includes a bar chart, a bubble chart, and a gauge chart to provide insights into the microbial species found in individuals' belly buttons.

## Introduction

The Belly Button Biodiversity Dashboard is built using D3.js for data visualization and Plotly for creating interactive charts. The dataset includes information about individuals, their microbial samples, and metadata.

## Features

- Bar chart displaying the top 10 Operational Taxonomic Units (OTU) based on sample values.
- Bubble chart visualizing each sample with OTU IDs, sample values, and marker sizes/colors.
- Gauge chart showing the weekly washing frequency of individuals.
- Dropdown menu for selecting different samples and updating charts accordingly.
- Display of metadata information for the selected sample.

## Files

static/js/app.js - contains the java script code for plotting and menu display.
intex.html - contains the html code to call app.js
samples.json - it is provided for reference.