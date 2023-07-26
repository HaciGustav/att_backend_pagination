import { tableStyles } from "@/styles/table_styles";
import { Avatar } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useColumns = () => {
  const { bookingTypes } = useSelector((state) => state.atina);

  const USER_TABLE_COLUMNS = [
    {
      accessor: "firstname",
      Header: "vorname",
    },
    {
      accessor: "lastname",
      Header: "nachname",
    },
    {
      accessor: "username",
      Header: "benutzername",
    },
    {
      accessor: "passwordHash",
      Header: "kennwort",
      Cell: () => "*******",
    },
    {
      accessor: "personnelnumber",
      Header: "personalnummer",
    },
    {
      Header: "bild",
      Cell: (row) => (
        <Avatar
          sx={{ ...tableStyles.tr.image, margin: "auto" }}
          src={`data:image/png;base64,${row.original?.image}`}
        />
      ),
    },
  ];
  const ITEM_TABLE_ORDER_COLUMNS = [
    {
      accessor: "itemType",
      Header: "typ",
      Cell: "Auftrag",
    },
    {
      accessor: "itemNumber",
      Header: "Datensatznummer",
    },
    {
      accessor: "street",
      Header: "straße",
    },
    {
      accessor: "streetnumber",
      Header: "Hausnummer",
    },
    // {
    //   accessor: "personnelnumber",
    //   Header: "personalnummer",
    // },
    {
      accessor: "zip",
      Header: "plz",
    },
    {
      accessor: "city",
      Header: "stadt",
    },
    {
      accessor: "country",
      Header: "land",
    },
    {
      accessor: "data1",
      Header: "Mandant",
    },
    {
      accessor: "data2",
      Header: "Auftragsart",
    },
    {
      accessor: "data3",
      Header: "Auftragsbetreff",
    },
    {
      accessor: "data4",
      Header: "Kundennummer",
    },
    {
      accessor: "data5",
      Header: "Kundenname",
    },
  ];
  const ITEM_TABLE_METER_COLUMNS = [
    {
      accessor: "itemType",
      Header: "typ",
      Cell: "Zähler",
    },
    {
      accessor: "itemNumber",
      Header: "Datensatznummer",
    },
    {
      accessor: "street",
      Header: "straße",
    },
    {
      accessor: "streetnumber",
      Header: "Hausnummer",
    },
    // {
    //   accessor: "personnelnumber",
    //   Header: "personalnummer",
    // },
    {
      accessor: "zip",
      Header: "plz",
    },
    {
      accessor: "city",
      Header: "stadt",
    },
    {
      accessor: "country",
      Header: "land",
    },
    {
      accessor: "data1",
      Header: "Letzte Ablesung am",
    },
    {
      accessor: "data2",
      Header: "Letzte Ablesung",
    },
  ];
  const ITEM_TABLE_VEHICLE_COLUMNS = [
    {
      accessor: "itemType",
      Header: "typ",
      Cell: "KFZ",
    },
    {
      accessor: "itemNumber",
      Header: "Datensatznummer",
    },
    {
      accessor: "data1",
      Header: "Mandant",
    },
    {
      accessor: "data2",
      Header: "Standort",
    },
    {
      accessor: "data3",
      Header: "Kennzeichen",
    },
    {
      accessor: "data4",
      Header: "Modell",
    },
    // {
    //   accessor: "data5",
    //   Header: "#",
    // },
    // {
    //   accessor: "data6",
    //   Header: "#",
    // },
  ];

  const NFC_TABLE_COLUMNS = [
    {
      accessor: "itemType",
      Header: "typ",
      Cell: ({ value }) => {
        if (value === "Order") {
          return "Auftrag";
        } else if (value === "Meter") {
          return "Zähler";
        } else if (value === "Vehicle") {
          return "KFZ";
        }
      },
    },
    {
      accessor: "itemNumber",
      Header: "datensatznummer",
    },
    {
      accessor: "street",
      Header: "straße",
    },
    {
      accessor: "streetnumber",
      Header: "hausnummer",
    },
    {
      accessor: "zip",
      Header: "plz",
    },
    {
      accessor: "city",
      Header: "stadt",
    },
    {
      accessor: "country",
      Header: "land",
    },
    {
      accessor: "data1",
      Header: "daten1",
    },
    {
      accessor: "data2",
      Header: "daten2",
    },
    {
      accessor: "data3",
      Header: "daten3",
    },
    {
      accessor: "data4",
      Header: "daten4",
    },
    {
      accessor: "data5",
      Header: "daten5",
    },
    {
      accessor: "data6",
      Header: "daten6",
    },
    {
      accessor: "data7",
      Header: "daten7",
    },
    {
      accessor: "data8",
      Header: "daten8",
    },
    {
      accessor: "data9",
      Header: "daten9",
    },
    {
      accessor: "data10",
      Header: "daten10",
    },
    {
      accessor: "createdDate",
      Header: "erstellt am",
      Cell: ({ value }) => new Date(value).toLocaleDateString("tr"),
    },
  ];

  const BUCHUNGEN_TABLE_COLUMNS = [
    {
      accessor: "FileCounter",
      Header: "Bilder",
    },
    {
      accessor: "Username",
      Header: "Benutzername",
      // width: 100,
    },
    {
      accessor: "BookingType",
      Header: "buchungstyp",
      Cell: ({ value }) => bookingTypes[value]?.Caption,
    },
    {
      accessor: "Itemnumber",
      Header: "Datensatznummer",
    },
    {
      accessor: "Date",
      Header: "datum",
      Cell: ({ value }) => value && new Date(value).toLocaleDateString("tr"),
    },
    {
      accessor: "Time",
      Header: "uhrzeit",
      Cell: ({ value }) => value?.slice(0, value?.lastIndexOf(":")),
    },
    {
      accessor: "ItemType",
      Header: "typ",
      Cell: ({ value }) => {
        if (value === "Order") {
          return "Auftrag";
        } else if (value === "Meter") {
          return "Zähler";
        } else if (value === "Vehicle") {
          return "KFZ";
        }
      },
    },
    {
      accessor: "Street",
      Header: "straße",
      Cell: ({ value }) => (value?.length > 0 ? value : ""),
    },
    {
      accessor: "Streetnumber",
      Header: "hausnummer",
      Cell: ({ value }) => (value?.length > 0 ? value : ""),
    },
    {
      accessor: "ZIP",
      Header: "plz",
      Cell: ({ value }) => (value?.length > 0 ? value : ""),
    },
    {
      accessor: "City",
      Header: "stadt",
      Cell: ({ value }) => (value?.length > 0 ? value : ""),
    },
    {
      accessor: "Country",
      Header: "land",
      Cell: ({ value }) => (value?.length > 0 ? value : ""),
    },
    {
      accessor: "Data1",
      Header: "Daten 1",
    },
    {
      accessor: "Data2",
      Header: "Daten 2",
    },
    {
      accessor: "Data3",
      Header: "Daten 3",
    },
    {
      accessor: "Data4",
      Header: "Daten 4",
    },
    {
      accessor: "Data5",
      Header: "Daten 5",
    },
  ];

  return {
    USER_TABLE_COLUMNS,
    ITEM_TABLE_ORDER_COLUMNS,
    ITEM_TABLE_METER_COLUMNS,
    ITEM_TABLE_VEHICLE_COLUMNS,
    NFC_TABLE_COLUMNS,
    BUCHUNGEN_TABLE_COLUMNS,
  };
};

export default useColumns;
