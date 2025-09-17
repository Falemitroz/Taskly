import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../helpers/AuthContext";
// import { getAllLists } from "../services/api";
import { getAllLists } from "../services/apiSwitcher";
import { ButtonCard, List, NewListForm } from "../components";
import { Grid } from "@mui/material";

import { ListContainer } from "../styles";
import PageLayout from "../PageLayout";

function Dashboard() {
  const { user } = useContext(AuthContext);

  const [lists, setLists] = useState([]);
  const [newList, setNewList] = useState({
    open: false,
    position: "start",
  });

  useEffect(() => {
    if (!user) {
      setLists([]);
      return;
    }

    const fetchLists = async () => {
      try {
        const res = await getAllLists();
        setLists(res);
      } catch (error) {
        console.error("Errore fetch Lists:", error);
      }
    };

    fetchLists();
  }, [user]);

  const renderNewListCard = (position) => (
    <Grid>
      <ButtonCard onClick={() => setNewList({ open: true, position })} />
    </Grid>
  );

  return (
    <PageLayout>
      <NewListForm
        showDialog={newList.open}
        position={newList.position}
        setLists={setLists}
        handleClose={() => setNewList({ ...newList, open: false })}
      />

      <ListContainer container spacing={5} columns={{ xs: 1, md: 3 }}>
        {renderNewListCard("start")}

        {lists.map((list, index) => (
          <Grid key={list.listId || index}>
            <List id={list.listId || index} />
          </Grid>
        ))}

        {lists.length > 3 && renderNewListCard("end")}
      </ListContainer>
    </PageLayout>
  );
}

export default Dashboard;
