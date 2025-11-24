import React, { useMemo } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { Job, Room } from "../../interfaces";
import logo from "../assets/logo.png";
import formation_1_1 from "../assets/1:1.png";
import formation_1_2 from "../assets/1:2.png";
import formation_2_1 from "../assets/2:1.png";
import formation_2_2 from "../assets/2:2.png";
import formation_2_4 from "../assets/2:4.png";
import formation_3_1 from "../assets/3:1.png";
import formation_3_1_side from "../assets/3:1_side.png";
import formation_3_2 from "../assets/3:2.png";
import formation_3_3 from "../assets/3:3.png";
import formation_4_1 from "../assets/4:1.png";
import formation_4_2 from "../assets/4:2.png";
import formation_4_4 from "../assets/4:4.png";
import formation_6_1 from "../assets/6:1.png";
import formation_6_1_side from "../assets/6:1_side.png";
import formation_6_2 from "../assets/6:2.png";
import formation_6_2_side from "../assets/6:2_side.png";
import formation_6_4_side from "../assets/6:4_side.png";
import formation_6_6 from "../assets/6:6.png";
import formation_6_6_side from "../assets/6:6_side.png";
import formation_7_1 from "../assets/7:1.png";
import placeholder from "../assets/placeholder.png";

const styles = StyleSheet.create({
  // Global styles
  page: {
    padding: 20,
    fontFamily: "Helvetica",
  },
  // Header
  headerBox: {
    backgroundColor: "#b3b3b3",
    padding: 0,
    paddingLeft: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flex: 1,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  clientBox: {
    backgroundColor: "#b3b3b3",
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    borderTopWidth: 0,
    borderTopColor: "#fff",
  },
  clientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  logo: {
    width: 70,
    height: 70,
  },
  section: {
    marginBottom: 10,
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sectionTitleTop: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 8,
    marginBottom: 3,
  },
  // Table styles
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    backgroundColor: "#dbdbdb",
    alignItems: "center",
    paddingVertical: 5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
    paddingVertical: 5,
  },
  tableCell: {
    fontSize: 10,
    margin: 5,
  },
  tableHeaderCell: {
    fontSize: 10,
    fontWeight: "bold",
    margin: 5,
  },
  // Column widths
  tableColRef: {
    flex: 0.2,
  },
  tableColRoom: {
    flex: 0.6,
  },
  tableColDescription: {
    flex: 2,
  },
  tableColQuantity: {
    flex: 1,
  },
  tableColCost: {
    flex: 1,
  },
  // Footer
  footerContainer: {
    backgroundColor: "#dbdbdb",
    padding: 10,
    flexDirection: "row",
    marginTop: 15,
  },
  footerLeft: {
    flex: 2,
    paddingRight: 10,
  },
  footerRight: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: "#ccc",
    paddingLeft: 10,
  },
  footerText: {
    fontSize: 10,
    marginBottom: 2,
  },
  footerRightSection: {
    marginBottom: 10,
  },
  footerRightTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  footerRightRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 5,
    paddingBottom: 5,
  },
  footerRightLabel: {
    fontSize: 10,
  },
  footerRightValue: {
    fontSize: 10,
  },
  // Detailed Summary Table styles
  detailedTableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    backgroundColor: "#dbdbdb",

    paddingVertical: 5,
  },
  detailedTableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  detailedTableCell: {
    fontSize: 10,
    margin: 5,
  },
  detailedTableHeaderCell: {
    fontSize: 10,
    fontWeight: "bold",
    margin: 5,
  },
  // Styles for the image row
  dimensionText: {
    fontSize: 8,
  },
  detailedColDetailsImageRow: {
    flex: 2,
    justifyContent: "center",
  },
  detailedColRateImageRow: {
    flex: 1,
    justifyContent: "center",
  },
  detailedColQtyImageRow: {
    flex: 1,
    justifyContent: "center",
  },
  detailedColSumImageRow: {
    flex: 1,
    justifyContent: "center",
  },
  // Footer
  footer: {
    position: "absolute",
    bottom: 2,
    left: 0,
    right: 0,
    height: 35,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  footerBox: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: "#a3a29f",
  },
  // Adjusted Column widths for Detailed Summary
  detailedColRef: {
    flex: 0.8,
  },
  detailedColRoomName: {
    flex: 1.5,
  },
  detailedColDetails: {
    flex: 3.5,
  },
  detailedColRate: {
    flex: 0.8,
  },
  detailedColQty: {
    flex: 0.8,
  },
  detailedColSum: {
    flex: 0.8,
  },
  // New styles for two-row details
  detailsTextRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 2,
  },
  detailItem: {
    fontSize: 8,
    marginBottom: 2,
  },
  detailColumn: {
    flex: 1,
  },
  // Styles for the final summary below the detailed summary
  finalSummaryContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  finalSummaryBox: {
    width: "40%",
    borderWidth: 1,
    borderColor: "#b3b3b3",
    padding: 5,
    backgroundColor: "#dbdbdb",
  },
  finalSummaryTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 3,
  },
  finalSummaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#b3b3b3",
  },
  finalSummaryLabel: {
    fontSize: 10,
    flex: 1,
    textAlign: "left",
    paddingRight: 5,
  },
  finalSummaryValue: {
    fontSize: 10,
    flex: 1,
    textAlign: "right",
    paddingLeft: 5,
    borderLeftWidth: 1,
    borderLeftColor: "black",
  },
  imageRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  imageCell: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 2,
  },
  imageContainer: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  imageStyle: {
    width: 60,
    height: 90,
    resizeMode: "contain",
  },
  widthLabel: {
    fontSize: 8,
    marginTop: 2,
    flexGrow: 0,
    flexShrink: 0,
  },
  heightLabelContainer: {
    justifyContent: "center",
    marginLeft: 0,
  },
  heightLabel: {
    fontSize: 8,
    alignContent: "center",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  detailedColQuoteNotes: {
    flex: 2.5, // Increase this value as needed
  },
});

const formationImageMap: { [key: string]: string } = {
  "1/1": formation_1_1,
  "1/2": formation_1_2,
  "2/1": formation_2_1,
  "2/2": formation_2_2,
  "2/4": formation_2_4,
  "3/1": formation_3_1,
  "3/1_side": formation_3_1_side,
  "3/2": formation_3_2,
  "3/3": formation_3_3,
  "4/1": formation_4_1,
  "4/2": formation_4_2,
  "4/4": formation_4_4,
  "6/1": formation_6_1,
  "6/1_side": formation_6_1_side,
  "6/2": formation_6_2,
  "6/2_side": formation_6_2_side,
  "6/4_side": formation_6_4_side,
  "6/6": formation_6_6,
  "6/6_side": formation_6_6_side,
  "7/1": formation_7_1,
  placeholder: placeholder,
};

const formatRoomDetails = (room: Room): string[][] => {
  const detailsArray: string[] = [];

  if (!room.casement) {
    detailsArray.push(`• Sash and Case`);
  } else {
    detailsArray.push(`• Casement Window`);
  }
  detailsArray.push("• Timber: Meranti Hardwood");

  if (room.glassType !== "Clear") {
    let glassTypeTopBottom = "";
    if (room.glassTypeTopBottom === "Both") {
      glassTypeTopBottom = " (top and bottom panes)";
    } else if (room.glassTypeTopBottom === "Top") {
      glassTypeTopBottom = " (top pane only)";
    } else if (room.glassTypeTopBottom === "Bottom") {
      glassTypeTopBottom = " (bottom pane only)";
    }
    detailsArray.push(`• Fit ${room.glassType} glass${glassTypeTopBottom}`);
  }

  const stainRepairs = room.stainRepairs || 0;
  if (stainRepairs > 0) {
    if (stainRepairs === 1) {
      detailsArray.push(`• Repair ${stainRepairs} stained glass pane`);
    } else {
      detailsArray.push(`• Repair ${stainRepairs} stained glass panes`);
    }
  }
  if (room.encapsulation != 0) {
    detailsArray.push(
      `• Carry out ${room.encapsulation} feature glass encapsulation(s)`
    );
  }
  if (room.centerMullion > 0){
    detailsArray.push(`• Strip out and replace ${room.centerMullion} decorative mullion(s)`)
  }
  if (room.dormer) {
    detailsArray.push("• Dormer Window");
  }
  if (room.concealedVent) {
    detailsArray.push("• Supply and fit concealed vent");
  }
  if (room.trickleVent) {
    detailsArray.push("• Supply and fit surface hood trickle vent");
  }
  if (room.handles) {
    detailsArray.push("• Refurbishment of handles");
  }
  if (room.shutters) {
    detailsArray.push("• Make shutters operational");
  }
  if (room.easyClean || room.eC) {
    detailsArray.push("• Easy Clean Installation");
  } else {
    detailsArray.push("• Easy Clean: TBC");
  }
  detailsArray.push("• Spacer Bar: TBC");
  detailsArray.push("• Colour in: TBC");
  detailsArray.push("• Colour Out: TBC");
  detailsArray.push("• Ironmongery: TBC");
  detailsArray.push("• Sash Restrictor: TBC");

  let customItemText = "Custom Item";
  if (room.customItemText !== "") {
    customItemText = room.customItemText;
  }

  if (room.customItem || room.customItem2 > 0) {
    detailsArray.push(`• ${customItemText}`);
  }

  const pairedDetails: string[][] = [];
  for (let i = 0; i < detailsArray.length; i += 2) {
    pairedDetails.push(detailsArray.slice(i, i + 2));
  }

  return pairedDetails;
};

// Calculate the cost for a room with tidy logging
const calculateRoomCost = (room: Room): number => {
  const glassTypeCosts: { [key: string]: number } = {
    Clear: 0,
    Toughened: 50,
    Obscured: 100,
    Laminated: 150,
    Fineo: 220,
    ToughenedObscured: 150,
  };

  const glassPosCosts: { [key: string]: number } = {
    Both: 2,
    Top: 1,
    Bottom: 1,
  };

  const panesNumber = room.panesNumber || 0;
  const glassType = room.glassType || "Clear";
  const glassPos = room.glassTypeTopBottom || "Bottom";
  const windowCount = room.count || 1;
  let formationOnly =
    room.formation === "placeholder" ? "1/1" : room.formation.split("_")[0];
  const formationInt = formationOnly
    .split("/")
    .map(Number)
    .reduce((a, b) => a + b);
  let priceChange = 0;
  if (room.priceChange2 != "0") {
    priceChange = parseFloat(room.priceChange2.replace("%", ""));
  } else {
    priceChange = room.priceChange || 0;
  }

  if (room.positiveNegative === "negative") {
    priceChange = priceChange * -1;
  }

  const encapsulationCost = room.encapsulation * 650;

  // Tidy logging using console groups for clarity
  console.group(`Cost Calculation for Room: ${room.roomName}`);
  console.log(
    "Dimensions:",
    `Width: ${room.width} mm`,
    `Height: ${room.height} mm`
  );
  console.log("Panes Number:", panesNumber);
  console.log("Glass Type:", glassType);
  console.log("Window Count:", windowCount);
  console.log("Price Change (%):", priceChange);
  console.log("Encapsulation Cost:", `£${encapsulationCost}`);

  // Base cost calculation steps

  const windowCost = Math.round(
    (((room.width / 1000) * (room.height / 1000) * 200 + 540) * 1.8 +
      30 * formationInt +
      glassTypeCosts[glassType] * glassPosCosts[glassPos]) *
      1.28 +
      room.encapsulation * 650
  );

  console.group("Base Cost Calculation");
  console.log("Cost per window:", `£${windowCost}`);

  const baseCost = windowCost;
  console.log("Base Cost before multipliers:", `£${baseCost}`);
  console.groupEnd();

  // Apply multipliers
  const roomChangeCost = baseCost * (1 + priceChange / 100);
  const withCasementCost = roomChangeCost * (room.casement ? 0.8 : 1); // 20% reduction if casement is true
  let totalCost = withCasementCost;
  console.group("After Multipliers");
  console.log(
    "Room Change Cost (after price change multiplier):",
    `£${roomChangeCost}`
  );
  console.log("Cost after Casement adjustment:", `£${withCasementCost}`);
  console.groupEnd();

  // Additional costs
  console.group("Additional Costs");
  if (room.dormer) {
    totalCost += 420;
    console.log("Added Dormer Cost:", "£420");
  }
  if (room.centerMullion>0){
    totalCost += 150 * room.centerMullion
  }
  if (room.easyClean || room.eC) {
    totalCost += 80;
    console.log("Added Easy Clean Cost:", "£80");
  }
  if (room.stainRepairs) {
    const stainCost = room.stainRepairs * 45;
    totalCost += stainCost;
    console.log("Added Stain Repairs Cost:", `£${stainCost}`);
  }
  if (room.shutters) {
    totalCost += 150;
    console.log("Added Shutters Cost:", "£150");
  }
  if (room.concealedVent) {
    totalCost += 45;
    console.log("Added Concealed Trickle Vent Cost:", "£45");
  }
  if (room.trickleVent) {
    totalCost += 32;
    console.log("Added Trickle Vent Cost:", "£32");
  }
  if (room.handles) {
    totalCost += 22;
    console.log("Added Handles Cost:", "£22");
  }
  if (room.customItem2 > 0) {
    totalCost += room.customItem2;
    console.log("Added Custom Item Cost:", `£${room.customItem2}`);
  }
  console.groupEnd();

  console.log("Final Window Cost (per window):", `£${totalCost}`);
  console.groupEnd();

  const finalCost = totalCost * windowCount;
  if (isNaN(finalCost)) {
    console.warn(
      `Warning: Calculated cost for room "${room.roomName}" is NaN. Check input values.`
    );
    return 0;
  }
  return Math.round(finalCost);
};

const NewWindowsPDF: React.FC<{ job: Job }> = ({ job }) => {
  const companyName = "Preservation Windows";
  const companyAddress = "124 Great Western Road";
  const companyCity = "Glasgow";
  const stateZip = "G4 9AD";

  const anyCasement = useMemo(
    () => job.rooms?.some((r) => !!r.casement) ?? false,
    [job.rooms]
  );

  let adminFee = 0;
  let planningFee = 0;

  console.log(`!!!Planning Permission: ${job.planningPermission}`);
  if (job.planningPermission === "Planning Permission: Conservation Area") {
    adminFee = 0;
    planningFee = 0;
  } else if (
    [
      "Planning Permission: Conservation Area, Category A",
      "Planning Permission: Conservation Area, Category B",
      "Planning Permission: Conservation Area, Category C",
    ].includes(job.planningPermission)
  ) {
    adminFee = 0;
    planningFee = 200;
  }
  console.log(`!!!Admin fee: £${adminFee}`);
  console.log(`!!!Planning fee: £${planningFee}`);

  // Calculate room costs
  const roomCosts = useMemo(
    () => job.rooms.map((room) => calculateRoomCost(room)),
    [job.rooms]
  );
  const totalCount = job.rooms.reduce(
    (sum, room) => sum + (room.count || 1),
    0
  );

  console.log(`Admin fee: £${adminFee}`);
  let subtotal = roomCosts.reduce((sum, cost) => sum + cost, 0);
  console.log(`Subtotal: £${subtotal}`);
  let subtotalWithAdmin = subtotal + adminFee + planningFee;
  console.log(`Subtotal with admin and fees: £${subtotalWithAdmin}`);
  const vatAmount = subtotalWithAdmin * 0.2;
  const total = subtotalWithAdmin + vatAmount + planningFee;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerBox}>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <Text style={styles.text}>
                Date: {job.date}
                {"\n\n"}
              </Text>
              <Text style={styles.text}>{companyAddress}</Text>
              <Text style={styles.text}>{companyCity}</Text>
              <Text style={styles.text}>{stateZip}</Text>
            </View>
            <View style={styles.headerCenter}>
              <Text style={styles.headerText}>{companyName}</Text>
              <Text style={styles.headerText}>Quotation</Text>
            </View>
            <View style={styles.headerRight}>
              <Image style={styles.logo} src={logo} />
            </View>
          </View>
        </View>

        {/* Client Box */}
        <View style={styles.clientBox}>
          <View style={styles.clientRow}>
            <Text style={styles.text}>Client: {job.customerName}</Text>
            <Text style={styles.text}>Job ID: {job.quoteId}</Text>
          </View>
        </View>

        {/* Client Box for Address and Planning Permission */}
        <View style={styles.clientBox}>
          <View style={styles.clientRow}>
            {job.addressLineOne ||
            job.addressLineTwo ||
            job.addressLineThree ? (
              <Text style={styles.text}>
                {job.addressLineOne ? `${job.addressLineOne}\n` : ""}
                {job.addressLineTwo ? `${job.addressLineTwo}\n` : ""}
                {job.addressLineThree ? job.addressLineThree : ""}
              </Text>
            ) : (
              <Text style={styles.text}>
                Address: {job.address}
                {"\n"}Postcode: {job.postCode}
              </Text>
            )}
            <Text style={styles.text}>{job.planningPermission}</Text>
          </View>
        </View>
        {/* Project Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitleTop}>
            Project Summary: To supply and fit new hardwood double glazed{" "}
            {anyCasement ? "casement windows" : "sash and case windows"}.
          </Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.tableColRef]}>
              Ref
            </Text>
            <Text style={[styles.tableHeaderCell, styles.tableColRoom]}>
              Location
            </Text>
            <Text style={[styles.tableHeaderCell, styles.tableColDescription]}>
              Description
            </Text>
            <Text style={[styles.tableHeaderCell, styles.tableColQuantity]}>
              Quantity ({totalCount})
            </Text>
            <Text style={[styles.tableHeaderCell, styles.tableColCost]}>
              Cost (£)
            </Text>
          </View>
        </View>

        {job.rooms.map((room, index) => {
          const roomCost = roomCosts[index];
          if (index === 10) {
            return (
              <React.Fragment key={`page-break-${index}`}>
                {/* Force a page break */}
                <View break />

                {/* Re-render the header for the new page */}
                <View style={styles.headerBox}>
                  <View style={styles.headerRow}>
                    <View style={styles.headerLeft}>
                      <Text style={styles.text}>Date: {job.date}</Text>
                      <Text style={styles.text}>{companyAddress}</Text>
                      <Text style={styles.text}>{companyCity}</Text>
                      <Text style={styles.text}>{stateZip}</Text>
                    </View>
                    <View style={styles.headerCenter}>
                      <Text style={styles.headerText}>{companyName}</Text>
                      <Text style={styles.headerText}>Quotation</Text>
                    </View>
                    <View style={styles.headerRight}>
                      <Image style={styles.logo} src={logo} />
                    </View>
                  </View>
                </View>

                {/* Re-render the table header */}
                <View style={styles.tableHeader}>
                  <Text style={[styles.tableHeaderCell, styles.tableColRef]}>
                    Ref
                  </Text>
                  <Text style={[styles.tableHeaderCell, styles.tableColRoom]}>
                    Location
                  </Text>
                  <Text
                    style={[styles.tableHeaderCell, styles.tableColDescription]}
                  >
                    Description
                  </Text>
                  <Text
                    style={[styles.tableHeaderCell, styles.tableColQuantity]}
                  >
                    Quantity ({totalCount})
                  </Text>
                  <Text style={[styles.tableHeaderCell, styles.tableColCost]}>
                    Cost (£)
                  </Text>
                </View>

                {/* Render the 11th room */}
                <View style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.tableColRef]}>
                    {room.ref}
                  </Text>
                  <Text style={[styles.tableCell, styles.tableColRoom]}>
                    {room.roomName}
                  </Text>
                  <Text style={[styles.tableCell, styles.tableColDescription]}>
                    {room.width} x {room.height} mm{" "}
                    {room.casement ? "Casement" : "Sash and Case"}
                  </Text>
                  <Text style={[styles.tableCell, styles.tableColQuantity]}>
                    {room.count || 0}
                  </Text>
                  <Text style={[styles.tableCell, styles.tableColCost]}>
                    £{roomCost.toFixed(2)}
                  </Text>
                </View>
              </React.Fragment>
            );
          }
          return (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.tableColRef]}>
                {room.ref}
              </Text>
              <Text style={[styles.tableCell, styles.tableColRoom]}>
                {room.roomName}
              </Text>
              <Text style={[styles.tableCell, styles.tableColDescription]}>
                {room.width} x {room.height} mm Sash and Case
              </Text>
              <Text style={[styles.tableCell, styles.tableColQuantity]}>
                {room.count || 0}
              </Text>
              <Text style={[styles.tableCell, styles.tableColCost]}>
                £{roomCost.toFixed(2)}
              </Text>
            </View>
          );
        })}

        {/* Footer Container */}
        <View style={styles.footerContainer}>
          <View style={styles.footerLeft}>
            <Text
              style={[styles.footerText, { fontWeight: "bold", fontSize: 12 }]}
            >
              Notes
            </Text>
            <Text style={styles.footerText}>
              All new windows will be fully finished in a colour of your choice
              and all exterior mastic pointing is included in the quotation.
            </Text>
            <Text style={styles.footerText}>
              All curtains/blinds to be removed by customer prior to the
              installation.
            </Text>
            <Text style={styles.footerText}>
              We hope this quotation is of interest to you and look forward to
              hearing from you in the future. This quotation will be valid for 3
              months from the issue date.
            </Text>
            <Text
              style={[
                styles.footerText,
                { fontWeight: "bold", fontSize: 12, marginTop: 10 },
              ]}
            >
              Payment Terms
            </Text>
            <Text style={styles.footerText}>
              On the first day of installation we require you to pay 50% of the
              agreed quote. Once installation is complete the remainder of the
              balance will be required.
            </Text>
          </View>
          <View style={styles.footerRight}>
            <View style={styles.footerRightSection}>
              <Text style={styles.footerRightTitle}>Final Summary</Text>
            </View>
            <View style={styles.footerRightRow}>
              <Text style={styles.footerRightLabel}>Subtotal</Text>
              <Text style={styles.footerRightValue}>
                £{subtotalWithAdmin.toFixed(2)}
              </Text>
            </View>
            {planningFee > 0 && (
              <View style={styles.footerRightRow}>
                <Text style={styles.footerRightLabel}>Planning fee</Text>
                <Text style={styles.footerRightValue}>
                  £{planningFee.toFixed(2)}
                </Text>
              </View>
            )}
            <View style={styles.footerRightRow}>
              <Text style={styles.footerRightLabel}>VAT (20%)</Text>
              <Text style={styles.footerRightValue}>
                £{vatAmount.toFixed(2)}
              </Text>
            </View>
            <View style={styles.footerRightRow}>
              <Text style={[styles.footerRightLabel, { fontWeight: "bold" }]}>
                Total
              </Text>
              <Text style={[styles.footerRightValue, { fontWeight: "bold" }]}>
                £{total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            124 Great Western Road | Glasgow G4 9AD | Tel: 0141 352 9910
          </Text>
          <View style={styles.footerBox} />
        </View>

        <View style={styles.headerBox} break>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <Text style={styles.text}>Date: {job.date}</Text>
              <Text style={styles.text}>{companyAddress}</Text>
              <Text style={styles.text}>{companyCity}</Text>
              <Text style={styles.text}>{stateZip}</Text>
            </View>
            <View style={styles.headerCenter}>
              <Text style={styles.headerText}>{companyName}</Text>
              <Text style={styles.text}>Quotation</Text>
            </View>
            <View style={styles.headerRight}>
              <Image style={styles.logo} src={logo} />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detailed Summary</Text>
          <View style={styles.detailedTableHeader}>
            <Text
              style={[styles.detailedTableHeaderCell, styles.detailedColRef]}
            >
              Ref
            </Text>
            <Text
              style={[
                styles.detailedTableHeaderCell,
                styles.detailedColRoomName,
              ]}
            >
              Location
            </Text>
            <Text
              style={[
                styles.detailedTableHeaderCell,
                styles.detailedColDetails,
              ]}
            >
              Details
            </Text>
            <Text
              style={[styles.detailedTableHeaderCell, styles.detailedColRate]}
            >
              Rate (£)
            </Text>
            <Text
              style={[styles.detailedTableHeaderCell, styles.detailedColQty]}
            >
              Qty
            </Text>
            <Text
              style={[styles.detailedTableHeaderCell, styles.detailedColSum]}
            >
              Sum (£)
            </Text>
          </View>
          {job.rooms.map((room, index) => {
            const roomCost = roomCosts[index];
            const count = room.count || 1;
            const rate = roomCost / count;
            return (
              <React.Fragment key={index}>
                {index > 0 && index % 4 === 0 && (
                  <>
                    <View style={styles.headerBox} break>
                      <View style={styles.headerRow}>
                        <View style={styles.headerLeft}>
                          <Text style={styles.text}>Date: {job.date}</Text>
                          <Text style={styles.text}>{companyAddress}</Text>
                          <Text style={styles.text}>{companyCity}</Text>
                          <Text style={styles.text}>{stateZip}</Text>
                        </View>
                        <View style={styles.headerCenter}>
                          <Text style={styles.headerText}>{companyName}</Text>
                          <Text style={styles.text}>Quotation</Text>
                        </View>
                        <View style={styles.headerRight}>
                          <Image style={styles.logo} src={logo} />
                        </View>
                      </View>
                    </View>
                    <View style={styles.detailedTableHeader}>
                      <Text
                        style={[
                          styles.detailedTableHeaderCell,
                          styles.detailedColRef,
                        ]}
                      >
                        Ref
                      </Text>
                      <Text
                        style={[
                          styles.detailedTableHeaderCell,
                          styles.detailedColRoomName,
                        ]}
                      >
                        Location
                      </Text>
                      <Text
                        style={[
                          styles.detailedTableHeaderCell,
                          styles.detailedColDetails,
                        ]}
                      >
                        Details
                      </Text>
                      <Text
                        style={[
                          styles.detailedTableHeaderCell,
                          styles.detailedColRate,
                        ]}
                      >
                        Rate (£)
                      </Text>
                      <Text
                        style={[
                          styles.detailedTableHeaderCell,
                          styles.detailedColQty,
                        ]}
                      >
                        Qty
                      </Text>
                      <Text
                        style={[
                          styles.detailedTableHeaderCell,
                          styles.detailedColSum,
                        ]}
                      >
                        Sum (£)
                      </Text>
                    </View>
                  </>
                )}
                <View style={styles.detailedTableRow}>
                  <Text
                    style={[styles.detailedTableCell, styles.detailedColRef]}
                  >
                    {room.ref}
                  </Text>
                  <Text
                    style={[
                      styles.detailedTableCell,
                      styles.detailedColRoomName,
                    ]}
                  >
                    {room.roomName}
                  </Text>
                  <Text
                    style={[
                      styles.detailedTableCell,
                      styles.detailedColQuoteNotes,
                    ]}
                  >
                    {room.quoteNotes}
                  </Text>

                  <Text
                    style={[
                      styles.detailedTableCell,
                      styles.detailedColDetails,
                    ]}
                  >
                    {(() => {
                      let priceValue: number = 0;
                      if (room.priceChange2 != "") {
                        // Remove % if present and parse
                        priceValue = parseFloat(
                          room.priceChange2.replace("%", "")
                        );
                      } else {
                        priceValue = room.priceChange;
                      }

                      if (priceValue < 0) return `${room.priceChangeNotes}`;
                      if (priceValue > 0) return `${room.priceChangeNotes}`;
                      return room.priceChangeNotes;
                    })()}
                  </Text>
                  <Text
                    style={[styles.detailedTableCell, styles.detailedColRate]}
                  ></Text>
                  <Text
                    style={[styles.detailedTableCell, styles.detailedColQty]}
                  ></Text>
                  <Text
                    style={[styles.detailedTableCell, styles.detailedColSum]}
                  ></Text>
                </View>
                <View style={styles.imageRow}>
                  <View style={styles.imageCell}>
                    <View style={styles.imageContainer}>
                      <Image
                        src={formationImageMap[room.formation]}
                        style={styles.imageStyle}
                      />
                      <Text style={styles.widthLabel}>{room.width} mm</Text>
                    </View>
                    <View style={styles.heightLabelContainer}>
                      <Text style={styles.heightLabel}>{room.height} mm</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.detailedTableCell,
                      styles.detailedColDetails,
                    ]}
                  >
                    {formatRoomDetails(room).map((detailPair, idx) => (
                      <View key={idx} style={styles.detailRow}>
                        <Text style={[styles.detailItem, styles.detailColumn]}>
                          {detailPair[0]}
                        </Text>
                        <Text style={[styles.detailItem, styles.detailColumn]}>
                          {detailPair[1] || ""}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <Text
                    style={[
                      styles.detailedTableCell,
                      styles.detailedColRateImageRow,
                    ]}
                  >
                    £{rate.toFixed(2)}
                  </Text>
                  <Text
                    style={[
                      styles.detailedTableCell,
                      styles.detailedColQtyImageRow,
                    ]}
                  >
                    {count}
                  </Text>
                  <Text
                    style={[
                      styles.detailedTableCell,
                      styles.detailedColSumImageRow,
                    ]}
                  >
                    £{roomCost.toFixed(2)}
                  </Text>
                </View>
              </React.Fragment>
            );
          })}
        </View>

        <View style={styles.finalSummaryContainer}>
          <View style={styles.finalSummaryBox}>
            <Text style={styles.finalSummaryTitle}>Final Summary</Text>
            <View style={styles.finalSummaryRow}>
              <Text style={styles.finalSummaryLabel}>Subtotal</Text>
              <Text style={styles.finalSummaryValue}>
                £{subtotalWithAdmin.toFixed(2)}
              </Text>
            </View>
            {planningFee > 0 && (
              <View style={styles.finalSummaryRow}>
                <Text style={styles.finalSummaryLabel}>Planning Fee</Text>
                <Text style={styles.finalSummaryValue}>
                  £{planningFee.toFixed(2)}
                </Text>
              </View>
            )}
            <View style={styles.finalSummaryRow}>
              <Text style={styles.finalSummaryLabel}>VAT (20%)</Text>
              <Text style={styles.finalSummaryValue}>
                £{vatAmount.toFixed(2)}
              </Text>
            </View>
            <View style={styles.finalSummaryRow}>
              <Text style={[styles.finalSummaryLabel, { fontWeight: "bold" }]}>
                Total
              </Text>
              <Text style={[styles.finalSummaryValue, { fontWeight: "bold" }]}>
                £{total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default NewWindowsPDF;
