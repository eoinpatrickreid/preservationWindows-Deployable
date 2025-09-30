// src/components/pdfs/RefurbPDF.tsx

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
import logo from "../assets/logo.png"; // Adjust the path as necessary

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
    flex: 0.5,
  },
  tableColRoom: {
    flex: 1,
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
    marginTop: 20,
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
    marginBottom: 5,
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
    alignItems: "center",
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
  // Cells for Details, Rate, Qty, Sum in the image row
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
    flex: 0.5,
  },
  detailedColRoomName: {
    flex: 1.5,
  },
  detailedColDetails: {
    flex: 6,
  },
  detailedColRate: {
    flex: 1,
  },
  detailedColQty: {
    flex: 1,
  },
  detailedColSum: {
    flex: 1,
  },
  // Styles for the image row
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
  dimensionText: {
    fontSize: 8,
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
  // "6/4": formation_6_4,
  "6/6": formation_6_6,
  "6/6_side": formation_6_6_side,
  "7/1": formation_7_1,
  placeholder: placeholder,
};

// Function to parse formation and calculate astrical
const calculateAstrical = (formation: string): number => {
  if (!formation) return 0;
  const parts = formation.split("/");
  if (parts.length !== 2) return 0;
  const num1 = parseInt(parts[0], 10);
  const num2 = parseInt(parts[1], 10);
  if (isNaN(num1) || isNaN(num2)) return 0;
  return num1 + num2;
};

// Calculate the cost for a room
const calculateRoomCost = (
  room: Room
): {
  totalCost: number;
  costBreakdown: { [key: string]: number };
} => {
  const costBreakdown: { [key: string]: number } = {};
  const windowCount = room.count || 1;
  const panesNumber = room.panesNumber || 0;
  const stainRepairs = room.stainRepairs || 0;
  let formationOnly = "";
  if (room.formation === "placeholder") {
    formationOnly = "1/1";
  } else {
    formationOnly = room.formation.split("_")[0];
  }
  const astrical = calculateAstrical(formationOnly || "") || 0;
  let priceChange = 0;
  if (room.priceChange2 != "") {
    priceChange = parseFloat(room.priceChange2.replace("%", ""));
  } else {
    priceChange = room.priceChange || 0;
  }

  if (room.positiveNegative === "negative") {
    priceChange = priceChange * -1;
  }

  // Main cost
  const mainCost =
    ((room.width / 1000) * (room.height / 1000) * 150 + 300 + astrical * 30) *
    1.28 *
    (1 + priceChange / 100) *
    (room.casement ? 0.8 : 1); // Apply 20% reduction if casement is true

  costBreakdown["• Overhaul and draught-proof installation"] =
    Math.round(mainCost);

  // Additional costs  
  let customItemText = "Custom Item";
  if (room.customItemText !== "") {
    customItemText = room.customItemText;
  }
  if (room.customItem2 > 0)  costBreakdown[`• ${customItemText}`] = room.customItem2;

  
  if (room.putty) costBreakdown["• Strip out and replace all loose putty"] = 20;
  if (room.tenon) costBreakdown["• Carry out tenon repairs"] = 30;
  if (room.mastic)
    costBreakdown[
      "• Strip out exterior pointing and replace with new poly sealant"
    ] = 160;
  if (room.masticPatch) costBreakdown["• Carry out mastic patch repairs"] = 50;
  if (room.paint)
    costBreakdown["• Paint on completion of works inside and out"] = 160;

  if (room.bottomRail) costBreakdown["• Carry out rail repair"] = 160;
  if (room.pullyWheel) costBreakdown["• Carry out pulley style repair"] = 70;
  if (room.easyClean || room.eC)
    costBreakdown["• Fit new simplex easy-clean system"] = 80;
  if (room.outsidePatch)
    costBreakdown["• Carry out outside facing patch repairs"] = 50;
  if (room.concealedVent) costBreakdown["• Fit concealed trickle vent"] = 45;
  if (room.trickleVent) costBreakdown["• Fit trickle vent"] = 32;
  if (room.handles) costBreakdown["• Refurbish customers handles"] = 22;

  // Cill costs
  if (room.cill) {
    switch (room.cill.toLowerCase()) {
      case "full":
        costBreakdown["• Strip out and replace one full sill"] = 240;
        break;
      case "half":
        costBreakdown["• Strip out and replace one half sill"] = 160;
        break;
      case "repairs":
        costBreakdown["• Carry out sill repairs"] = 70;
        break;
      default:
    }
  }

  // Sash costs
  if (room.sash) {
    switch (room.sash.toLowerCase()) {
      case "top":
        costBreakdown["• Strip out and replace replace top sash"] = 360;
        break;
      case "bottom":
        costBreakdown["• Strip out and replace bottom Sash"] = 360;
        break;
      case "both":
        costBreakdown["• Strip out and replace top and bottom sash"] = 720;
        break;
      default:
    }
  }

  if (panesNumber > 0) {
    if (panesNumber === 1) {
      const newPanesStr = "• Supply and fit " + `${panesNumber}` + " new pane";
      costBreakdown[newPanesStr] = 90;
    } else {
      const newPanesStr = "• Supply and fit " + `${panesNumber}` + " new panes";
      costBreakdown[newPanesStr] = panesNumber * 90;
    }
  }
  // Stain repairs
  if (stainRepairs > 0) {
    if (stainRepairs === 1) {
      const stainRepairsStr =
        "• Repair " + `${stainRepairs}` + " stained glass pane";
      costBreakdown[stainRepairsStr] = 45;
    } else {
      const stainRepairsStr =
        "• Repair " + `${stainRepairs}` + " stained glass panes";
      costBreakdown[stainRepairsStr] = stainRepairs * 45;
    }
  }
  // Glass type costs


  // Sum up all costs per window
  const totalCostPerWindow = Object.values(costBreakdown).reduce(
    (sum, value) => sum + value,
    0
  );

  // Total cost for the room
  const totalCost = totalCostPerWindow * windowCount;

  return { totalCost, costBreakdown };
};

const RefurbPDF: React.FC<{ job: Job }> = ({ job }) => {
  const companyName = "Preservation Windows";
  const companyAddress = "124 Great Western Road";
  const companyCity = "Glasgow";
  const stateZip = "G4 9AD";

  // Compute roomRefs

  // Calculate costs
  const roomCosts = useMemo(() => {
    return job.rooms.map((room) => {
      const { totalCost, costBreakdown } = calculateRoomCost(room);
      return { totalCost, costBreakdown };
    });
  }, [job.rooms]);

  const subtotal = roomCosts.reduce((sum, { totalCost }) => sum + totalCost, 0);
  const vatAmount = subtotal * 0.2;
  const total = subtotal + vatAmount;
  const totalCount = job.rooms.reduce(
    (sum, room) => sum + (room.count || 1),
    0
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerBox}>
          <View style={styles.headerRow}>
            {/* Left side: Date and company address */}
            <View style={styles.headerLeft}>
              <Text style={styles.text}>
                Date: {job.date} {"\n\n"}{" "}
              </Text>

              <Text style={styles.text}>{companyAddress}</Text>
              <Text style={styles.text}>{companyCity}</Text>
              <Text style={styles.text}>{stateZip}</Text>
            </View>

            {/* Center: Company name and Quotation */}
            <View style={styles.headerCenter}>
              <Text style={styles.headerText}>{companyName}</Text>
              <Text style={styles.headerText}>Quotation</Text>
            </View>

            {/* Right side: Logo */}
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
            Project Summary: To carry out the refurbishment and draught proofing
            of the existing windows.
          </Text>

          {/* Table Header */}
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

          {/* Table Rows */}
          {job.rooms.map((room, index) => {
            const { totalCost } = roomCosts[index];
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
                  £{totalCost.toFixed(2)}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Footer Container */}
        <View style={styles.footerContainer}>
          {/* Left 2/3rds */}
          <View style={styles.footerLeft}>
            <Text
              style={[styles.footerText, { fontWeight: "bold", fontSize: 12 }]}
            >
              Notes
            </Text>
            <Text style={styles.footerText}>
              All refurbished windows will be fully finished in a colour of your
              choice and all exterior mastic pointing is included in the
              quotation.
            </Text>
            <Text style={styles.footerText}>
              All curtains to be removed by customer prior to the refurbishment.
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
              On the first day of refurbishment we require you to pay 50% of the
              agreed quote. Once refurbishment is complete the remainder of the
              balance will be required.
            </Text>
          </View>

          {/* Right 1/3rd */}
          <View style={styles.footerRight}>
            {/* Final Summary Title */}
            <View style={styles.footerRightSection}>
              <Text style={styles.footerRightTitle}>Final Summary</Text>
            </View>

            {/* Subtotal */}
            <View style={styles.footerRightRow}>
              <Text style={styles.footerRightLabel}>Subtotal</Text>
              <Text style={styles.footerRightValue}>
                £{subtotal.toFixed(2)}
              </Text>
            </View>

            {/* VAT */}
            <View style={styles.footerRightRow}>
              <Text style={styles.footerRightLabel}>VAT</Text>
              <Text style={styles.footerRightValue}>
                £{vatAmount.toFixed(2)}
              </Text>
            </View>

            {/* Total */}
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

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            124 Great Western Road | Glasgow G4 9AD | Tel: 0141 352 9910
          </Text>
          <View style={styles.footerBox} />
        </View>

        {/* Start the Detailed Summary on a new page */}
        <View style={styles.headerBox} break>
          <View style={styles.headerRow}>
            {/* Left side: Date and company address */}
            <View style={styles.headerLeft}>
              <Text style={styles.text}>Date: {job.date}</Text>
              <Text style={styles.text}>{companyAddress}</Text>
              <Text style={styles.text}>{companyCity}</Text>
              <Text style={styles.text}>{stateZip}</Text>
            </View>

            {/* Center: Company name and Quotation */}
            <View style={styles.headerCenter}>
              <Text style={styles.headerText}>{companyName}</Text>
              <Text style={styles.text}>Quotation</Text>
            </View>

            {/* Right side: Logo */}
            <View style={styles.headerRight}>
              <Image style={styles.logo} src={logo} />
            </View>
          </View>
        </View>

        {/* Detailed Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detailed Summary</Text>

          {/* Table Header */}
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
              Quantity
            </Text>
            <Text
              style={[styles.detailedTableHeaderCell, styles.detailedColSum]}
            >
              Sum (£)
            </Text>
          </View>

          {/* Table Rows */}
          {job.rooms.map((room, index) => {
            const { totalCost, costBreakdown } = roomCosts[index];
            const count = room.count || 1;

            // Prepare details text and prices
            const detailsEntries = Object.entries(costBreakdown);

            // Generate strings for details and prices
            const detailsText = detailsEntries
              .map(([detail, _]) => `${detail}:`)
              .join("\n");
            const detailsPrices = detailsEntries
              .map(([_, cost]) => `£${cost}`)
              .join("\n");

            return (
              <React.Fragment key={index}>
                {/* Insert a page break after every 4 rooms */}
                {index > 0 && index % 4 === 0 && (
                  <>
                    {/* Add a page break */}
                    <View style={styles.headerBox} break>
                      <View style={styles.headerRow}>
                        {/* Left side: Date and company address */}
                        <View style={styles.headerLeft}>
                          <Text style={styles.text}>Date: {job.date}</Text>
                          <Text style={styles.text}>{companyAddress}</Text>
                          <Text style={styles.text}>{companyCity}</Text>
                          <Text style={styles.text}>{stateZip}</Text>
                        </View>

                        {/* Center: Company name and Quotation */}
                        <View style={styles.headerCenter}>
                          <Text style={styles.headerText}>{companyName}</Text>
                          <Text style={styles.text}>Quotation</Text>
                        </View>

                        {/* Right side: Logo */}
                        <View style={styles.headerRight}>
                          <Image style={styles.logo} src={logo} />
                        </View>
                      </View>
                    </View>

                    {/* Re-render the table header after the break */}
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
                        Quantity
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

                {/* First Row: Ref and Room Name */}
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
                  {/* Details */}
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
                      } else{
                        priceValue = room.priceChange;
                      }

                      if (priceValue < 0) return ` ${room.priceChangeNotes}`;
                      if (priceValue > 0) return `${room.priceChangeNotes}`;
                      return room.priceChangeNotes;
                    })()}
                  </Text>
                  {/* Empty cells for Rate, Quantity, Sum */}
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

                {/* Second Row: Image and other details */}
                <View style={styles.imageRow}>
                  {/* Image Cell with Image and Labels */}
                  <View style={styles.imageCell}>
                    <View style={styles.imageContainer}>
                      <Image
                        src={formationImageMap[room.formation]}
                        style={styles.imageStyle}
                      />
                      <Text style={styles.widthLabel}>{room.width} mm</Text>
                    </View>
                    {/* Height Label */}
                    <View style={styles.heightLabelContainer}>
                      <Text style={styles.heightLabel}>{room.height} mm</Text>
                    </View>
                  </View>

                  {/* Details */}
                  <Text
                    style={[
                      styles.detailedTableCell,
                      styles.detailedColDetails,
                    ]}
                  >
                    {detailsText}
                  </Text>

                  {/* Rate */}
                  <Text
                    style={[styles.detailedTableCell, styles.detailedColRate]}
                  >
                    {detailsPrices}
                  </Text>

                  {/* Quantity */}
                  <Text
                    style={[styles.detailedTableCell, styles.detailedColQty]}
                  >
                    {count}
                  </Text>

                  {/* Sum */}
                  <Text
                    style={[styles.detailedTableCell, styles.detailedColSum]}
                  >
                    £{totalCost.toFixed(2)}
                  </Text>
                </View>
              </React.Fragment>
            );
          })}
        </View>

        {/* Final Summary Below Detailed Summary */}
        <View style={styles.finalSummaryContainer}>
          <View style={styles.finalSummaryBox}>
            <Text style={styles.finalSummaryTitle}>Final Summary</Text>
            {/* Subtotal */}
            <View style={styles.finalSummaryRow}>
              <Text style={styles.finalSummaryLabel}>Subtotal</Text>
              <Text style={styles.finalSummaryValue}>
                £{subtotal.toFixed(2)}
              </Text>
            </View>

            {/* VAT */}
            <View style={styles.finalSummaryRow}>
              <Text style={styles.finalSummaryLabel}>VAT</Text>
              <Text style={styles.finalSummaryValue}>
                £{vatAmount.toFixed(2)}
              </Text>
            </View>

            {/* Total */}
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

export default RefurbPDF;
