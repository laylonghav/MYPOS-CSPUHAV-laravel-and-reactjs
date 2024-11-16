import React, { useState } from "react";
import "./style.css";
import { Button, Input, message, Modal, Space } from "antd";
import { MdAdd, MdOutlineModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { CiCloudOn } from "react-icons/ci";
import profile from "../../assets/Image/logo/profile.png";

function RolePage() {
  // Separate the roles list and the current role being added/edited
  const [state, setState] = useState({
    visblaModule: false,
    loading: false,
    total: 900,
    objRole: [], // This will hold the list of roles
    newRole: {
      // This holds the role currently being added or edited
      id: "",
      name: "",
      posistion: "",
    },
    idEdite: null,
    searchTerm: "", // New state for search input
  });

  const onClickAddbtn = () => {
    setState((prevState) => ({
      ...prevState,
      visblaModule: true,
    }));
  };

  const oncloseModule = () => {
    setState((prevState) => ({
      ...prevState,
      visblaModule: false,
      idEdite: null,
      newRole: {
        // Reset the input fields after saving
        id: "",
        name: "",
        posistion: "",
      },
    }));
  };

  const onsave = () => {
    //Check fill required
    if (state.newRole.id == "") {
      message.warning("pls input id ! ");
      return;
    } else if (state.newRole.name == "") {
      message.warning("pls input name ! ");
      return;
    } else if (state.newRole.posistion == "") {
      message.warning("pls input posistion ! ");
      return;
    }

    if (state.idEdite == null) {
      // check iD or Role
      const indexfound = state.objRole.findIndex(
        (item) => item.id == state.newRole.id
      );
      // alert(indexfound);
      if (indexfound != -1) {
        message.error("ID already exit !");
        return;
      }

      setState((prevState) => ({
        ...prevState,
        objRole: [
          ...prevState.objRole,
          prevState.newRole, // Add the new role to the list
        ],
        newRole: {
          // Reset the input fields after saving
          id: "",
          name: "",
          posistion: "",
        },
        idEdite: null,
      }));
      message.success("Input successfully !");
      oncloseModule();
    } else {
      //Edite
      // Find the index of the role being edited
      const indexfound = state.objRole.findIndex(
        (item) => item.id === state.idEdite
      );

      // Update the specific role's details
      state.objRole[indexfound].name = state.newRole.name;
      state.objRole[indexfound].posistion = state.newRole.posistion; // Corrected from 'posi' to 'posistion'

      // Set the updated state
      setState((prevState) => ({
        ...prevState,
        objRole: [...state.objRole], // Just update objRole without nesting arrays
        newRole: {
          // Reset the input fields after saving
          id: "",
          name: "",
          posistion: "",
        },
        idEdite: null,
      }));

      message.success("Update successfully !");
      oncloseModule();
    }
  };

  const btnedite = (item) => {
    // Set the current role for editing by populating newRole with the selected item
    setState((p) => ({
      ...p,
      newRole: {
        ...item,
        // id: item.id,
        // name: item.name,
        // posistion: item.posistion,
      },
      idEdite: item.id,
    }));

    // Open the modal to edit the role
    onClickAddbtn();
  };

  const btndelete = (item) => {
    Modal.confirm({
      title: "Remove",
      content: "Are you sure to remove ?",
      onOk: () => {
        // Filter out the role to delete from the objRole array
        const newlist = state.objRole.filter((data) => data.id !== item.id);

        // Update the state with the filtered list
        setState((p) => ({
          ...p,
          objRole: newlist, // Use newlist directly
        }));
        message.success("Delete Successfully !");
      },
    });
  };

  // Filter roles based on the search term
  const filteredRoles = state.objRole.filter(
    (role) =>
      role.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      role.id.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      role.posistion.toLowerCase().includes(state.searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>RolePage</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: 10,
        }}
        className=""
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
          className=""
        >
          <div className="">Category</div>
          <Input.Search
            allowClear
            style={{ marginLeft: 10 }}
            placeholder="Search"
            value={state.searchTerm}
            onChange={(e) =>
              setState((prevState) => ({
                ...prevState,
                searchTerm: e.target.value,
              }))
            }
          />
        </div>
        <Button type="primary" icon={<MdAdd />} onClick={onClickAddbtn}>
          New
        </Button>
      </div>

      <Modal
        open={state.visblaModule}
        title={state.idEdite ? "Update role" : "New role"}
        footer={null}
        onCancel={oncloseModule}
      >
        <label htmlFor="">Id</label>
        <Input
          disabled={state.idEdite ? true : false}
          placeholder="Id"
          value={state.newRole.id}
          onChange={(e) => {
            setState((prevState) => ({
              ...prevState,
              newRole: {
                ...prevState.newRole,
                id: e.target.value,
              },
            }));
          }}
        />
        <label className="label" htmlFor="">
          Name
        </label>
        <Input
          placeholder="Name"
          value={state.newRole.name}
          onChange={(e) => {
            setState((prevState) => ({
              ...prevState,
              newRole: {
                ...prevState.newRole,
                name: e.target.value,
              },
            }));
          }}
        />
        <label htmlFor="">Posistion</label>
        <Input
          placeholder="Posistion"
          value={state.newRole.posistion}
          onChange={(e) => {
            setState((prevState) => ({
              ...prevState,
              newRole: {
                ...prevState.newRole,
                posistion: e.target.value,
              },
            }));
          }}
        />
        <div className="btnM">
          <Space>
            <Button onClick={oncloseModule}>Cancel</Button>
            <Button onClick={onsave} type="primary">
              {state.idEdite ? "Update" : "Save"}
            </Button>
          </Space>
        </div>
      </Modal>
      {state.objRole.length === 0 && (
        <div className="No-data">
          <CiCloudOn style={{ fontSize: 100 }} />
          <div>No record</div>
        </div>
      )}

      <div>
        {state?.objRole.length > 0 &&
          // state.objRole = state?.objRole
          // state.objRole.map((item, index) => (
          filteredRoles.map((item, index) => (
            <div className="list-role" key={item.id}>
              <div className="profile">
                <img src={profile} alt="" />
              </div>
              <div className="infor">
                <div>
                  {item.id}-{item.name}
                </div>
                <div>{item.posistion}</div>
              </div>
              <div className="btn">
                <Space>
                  <Button
                    onClick={() => btnedite(item, index)}
                    size="large"
                    type="primary"
                  >
                    <MdOutlineModeEditOutline />
                  </Button>
                  <Button
                    onClick={() => btndelete(item, index)}
                    size="large"
                    type="primary"
                    danger
                  >
                    <MdDelete />
                  </Button>
                </Space>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default RolePage;
