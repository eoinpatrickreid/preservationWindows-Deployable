import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Drawing } from "../../interfaces";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 4,
  },
});

const DrawingPlaceholderPDF: React.FC<{ drawing: Drawing }> = ({ drawing }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Drawing Placeholder</Text>
      <View>
        <Text style={styles.text}>Customer: {drawing.customerName}</Text>
        <Text style={styles.text}>Date: {drawing.date}</Text>
        <Text style={styles.text}>Quote ID: {drawing.quoteId}</Text>
        <Text style={styles.text}>
          (This is a placeholder. The proper drawing layout will go here later.)
        </Text>
      </View>
    </Page>
  </Document>
);

export default DrawingPlaceholderPDF;
