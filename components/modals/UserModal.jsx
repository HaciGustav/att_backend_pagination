"use client";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useAtinaCalls from "../../hooks/useAtinaCalls";
import ModalTab from "./UserModal_components/ModalTabs";
import { modalStyles } from "@/styles/modal_styles";
import { useSelector } from "react-redux";
import RolesList from "./UserModal_components/RolesList";

const UserModal = ({ setOpenUserModal, openUserModal, userInfo }) => {
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputVal, setInputVal] = useState(
    userInfo ? userInfo : { roleIds: [] }
  );
  const [roleIds, setRoleIds] = useState([]);
  const { user } = useSelector((state) => state.settings);
  // To keep the value of which tab is selected
  const [tab, setTab] = useState("Allgemein");
  const [tabValue, setTabValue] = useState(0);

  const { putUserData, postUserData } = useAtinaCalls();

  const handleClose = () => {
    setOpenUserModal(false);
    setInputVal(userInfo ? userInfo : { roleIds: [] });
    // setInputVal({ roles: [] });
  };
  const handleImageInputChange = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileContent = e.target.result;

      const base64String = fileContent.split(",")[1];
      // console.log(base64String);
      setSelectedImage(fileContent);
      setInputVal({ ...inputVal, image: base64String });
    };
    reader.readAsDataURL(selectedFile);
  };
  const handleChange = (e) => {
    if (!user?.isAdmin) return;
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // setInputVal({ roles: [] });
    if (userInfo) {
      putUserData(inputVal).then(() => handleClose());
    } else {
      postUserData(inputVal).then(() => handleClose());
    }
  };

  useEffect(() => {
    if (userInfo) {
      setInputVal({ ...userInfo, roleIds: [] });
    }
  }, []);

  return (
    <>
      <Modal
        open={openUserModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={modalStyles.userModal.cardStyle}>
          <ModalTab
            setTab={setTab}
            tabValue={tabValue}
            setTabValue={setTabValue}
          />
          {/* if tab is "Allgemein" this part will be shown */}
          {tab === "Allgemein" && (
            <div style={{ padding: 1 }}>
              <label htmlFor="imgInput">
                <div
                  style={{
                    ...modalStyles.userModal.imgStyle,
                    backgroundImage: selectedImage
                      ? `url(${selectedImage})`
                      : `url(${"/assets/placeholder.jpg"})`,
                  }}
                >
                  <PhotoCameraIcon
                    sx={{ cursor: "pointer" }}
                    fontSize="inherit"
                    color="inherit"
                  />
                  <input
                    // ref={inputRef}
                    style={modalStyles.userModal.input}
                    id="imgInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageInputChange}
                  />
                </div>
              </label>
              <CardContent sx={modalStyles.userModal.content}>
                <div style={modalStyles.userModal.inputGroup}>
                  <TextField
                    variant="outlined"
                    label="Benutzername"
                    size="small"
                    name="username"
                    sx={{ width: "100%" }}
                    value={inputVal?.username || ""}
                    onChange={handleChange}
                  />{" "}
                  <TextField
                    variant="outlined"
                    label="Kennwort"
                    size="small"
                    type={visible ? "text" : "password"}
                    name="password"
                    sx={{ width: "100%" }}
                    onChange={handleChange}
                    value={inputVal?.password || ""}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {!visible && (
                            <VisibilityOffIcon
                              onClick={() => setVisible(!visible)}
                              sx={{ cursor: "pointer" }}
                            />
                          )}
                          {visible && (
                            <VisibilityIcon
                              onClick={() => setVisible(!visible)}
                              sx={{ cursor: "pointer" }}
                            />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />{" "}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "13px",
                  }}
                >
                  <TextField
                    variant="outlined"
                    label="Vorname"
                    size="small"
                    name="firstname"
                    value={inputVal?.firstname || ""}
                    onChange={handleChange}
                  />

                  <TextField
                    variant="outlined"
                    label="Nachname"
                    size="small"
                    name="lastname"
                    value={inputVal?.lastname || ""}
                    onChange={handleChange}
                  />

                  <TextField
                    variant="outlined"
                    label="Personalnummer"
                    size="small"
                    name="personnelNumber"
                    value={inputVal?.personnelNumber || ""}
                    onChange={handleChange}
                  />
                </div>
              </CardContent>
            </div>
          )}
          {/* if tab is "Rolle" this part will be shown */}
          {tab === "Rolle" && (
            <RolesList
              inputVal={inputVal}
              setInputVal={setInputVal}
              setRoleIds={setRoleIds}
              roleIds={roleIds}
            />
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            {user?.isAdmin && (
              <Button
                onClick={handleSubmit}
                sx={modalStyles.userModal.button}
                variant="contained"
              >
                Speichern
              </Button>
            )}
            <Button
              sx={modalStyles.userModal.button}
              onClick={handleClose}
              variant="contained"
            >
              {user?.isAdmin ? "Abbrechen" : "Schließen"}
            </Button>
          </div>
        </Card>
      </Modal>
    </>
  );
};

export default UserModal;
