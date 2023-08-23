import { useDispatch } from "react-redux";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/ToastNotify";
import { fetchFail, fetchStart, getSuccess } from "../redux/slices/atinaSlice";
import useAxios from "./useAxios";

const useAtinaCalls = () => {
  const dispatch = useDispatch();
  const { axiosInstance, axiosWithToken } = useAxios();

  //!--------------- GET CALL --------------
  const getAtinaData = async (url) => {
    dispatch(fetchStart());

    let res = null;
    let error = null;
    try {
      const { data } = await axiosWithToken.get(`${url}`);
      dispatch(getSuccess({ data, url }));
      res = data;
    } catch (err) {
      toastErrorNotify(`Etwas ist schiefgelaufen.. `);
      const { message } = err;
      dispatch(fetchFail({ message }));
      console.log(err);
      console.log(message);
      error = err;
    }
    return { error, res };
  };

  const getUsersData = () => getAtinaData("AtinaUsers");
  const getBookingTypes = () =>
    getAtinaData("api/AtinaMasterData/GetBookingTypes");
  const getMobileBookingsData = (params = "") => {
    getAtinaData("api/AtinaMobileBookings?showPagination=true&" + params);
  };

  const getNfcTagsData = () => getAtinaData("AtinaNfcTags");

  const getAtinaItemsData = (params = "", type = "Order") =>
    getAtinaData(
      `api/AtinaItems/SearchByKeyValue?ItemType=${type}&onlyWithTagId=false&showPagination=true&` +
        params
    );
  const getAtinaRoleDefinitions = () =>
    getAtinaData("api/AtinaRoleDefinitions/getall");
  const getProtocolData = (params = "") => {
    getAtinaData("api/AtinaProtocol?showPagination=true&" + params);
  };
  //!--------------- POST CALL --------------
  const postAtinaData = async (url, params) => {
    try {
      const x = await axiosWithToken.post(`${url}`, params);
      toastSuccessNotify(`Erfolgreich durchgeführt..`);
      // getUsersData();
      console.log(x);
      console.log(params);
    } catch (error) {
      toastErrorNotify(`Etwas ist schiefgelaufen.. `);
      dispatch(fetchFail({ message: error.message }));
      console.log(error);
    }
  };

  const postUserData = (params) => {
    const editedRoles = params.roleIds.map((x) => Number(x));
    const editedParams = {
      ...params,
      roleIds: editedRoles,
    };
    postAtinaData("AtinaUsers/register", editedParams);
  };

  //!--------------- PUT CALL --------------
  const putAtinaData = async (url, info) => {
    try {
      await axiosWithToken.put(`${url}/${info.id}`, info);
      // toastSuccessNotify(`Etwas ist schiefgelaufen..`);
    } catch (err) {
      const { message } = err;
      dispatch(fetchFail({ message }));
      toastErrorNotify(`Etwas ist schiefgelaufen.. `);
      toastErrorNotify(`${message}`);
      console.log(err);
    }
  };

  const putUserData = async (info) => {
    const roles = info?.roleIds.map((x) => Number(x));
    console.log(info);
    try {
      const editedData = {
        id: info.id,
        username: info.username,
        firstname: info.firstname,
        lastname: info.lastname,
        personnelNumber: info.personnelnumber,
        password: info.password ? info.password : "",
        client: info.client,
        settlement: info.settlement,
        roleIds: roles,
      };

      await axiosWithToken.post("AtinaUsers/update", editedData);

      toastSuccessNotify(`Erfolgreich durchgeführt..`);
    } catch (err) {
      const { message } = err;
      dispatch(fetchFail({ message }));
      toastErrorNotify(`Etwas ist schiefgelaufen.. `);
      toastErrorNotify(`${message}`);
      console.log(err);
    }
  };

  //!--------------- DELETE CALL --------------
  const deleteAtinaData = async (url, id) => {
    let res = null;
    let error = null;
    try {
      res = await axiosWithToken.delete(`${url}/${id}`);
      toastSuccessNotify(`Erfolgreich aktualisiert..`);
    } catch (err) {
      error = err;
      const { message } = err;
      dispatch(fetchFail({ message }));
      toastErrorNotify(`Etwas ist schiefgelaufen.. `);
      toastErrorNotify(`${message}`);
      console.log(err);
    }
    return { res, error };
  };
  //*GET

  //*PUT
  // const putUserData = (info) => putAtinaData("AtinaUsers", info);

  //* DELETE
  const deleteAtinaItems = (id) => deleteAtinaData("api/AtinaItems/Delete", id);
  return {
    getUsersData,
    getMobileBookingsData,
    getNfcTagsData,
    getAtinaItemsData,
    getProtocolData,
    putUserData,
    deleteAtinaItems,
    getBookingTypes,
    getAtinaRoleDefinitions,
    postUserData,
  };
};

export default useAtinaCalls;
