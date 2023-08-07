import ErrorModal from "@/components/modals/ErrorModal";
// import NfcTable from "@/components/tables/NfcTable";
import { AtinaCalls } from "@/helpers/apiFunctions";
import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Head from "next/head";

const NfcTags = ({ data, error }) => {
  const NfcTable = dynamic(() => import("@/components/tables/NfcTable"), {
    ssr: false,
  });

  return (
    <>
      {/* <ErrorModal error={error} /> */}
      <Head>
        <title>NFC Tags</title>
      </Head>
      {/* <h2 style={{ marginBottom: "0.3rem", fontSize: "1.7rem" }}>NFC Tags</h2> */}
      <NfcTable data={data || []} />
    </>
  );
};

export default NfcTags;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  const atinaCalls = new AtinaCalls();

  // const { res, error } = await atinaCalls.fetchData("AtinaNfcTags");
  // const editedData = res?.map((item) => ({
  //   ...item.item,
  //   createdDate: item.createdDate,
  // }));

  return {
    props: {
      // data: !error && editedData, error: error,
      session,
    },
  };
};
