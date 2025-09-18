import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Grid } from "@mui/material";
import {
  HomeHeader,
  FeatureContainer,
  Feature,
  LinkButton,
  LinkButtonContainer,
  HomeHeaderTitle,
  FeatureContainerTitle,
} from "../styles";
import PageLayout from "../PageLayout";

function Home() {
  const { user, setAuthForm } = useContext(AuthContext);

  const features = [
    {
      title: "Create Task Lists",
      body: "Organize and manage multiple related tasks by consolidating them into a single list.",
    },
    {
      title: "Create Tasks",
      body: "Add tasks quickly and easily so you don't forget anything.",
    },
    {
      title: "Edit and Prioritize",
      body: "Organize your work by modifying tasks according to your needs.",
    },
    {
      title: "Delete Tasks",
      body: "Don't need a task anymore? Delete it in one click to keep everything organized.",
    },
  ];

  return (
    <PageLayout>
      {/* Home Header */}
      <HomeHeader variant="contained" color="primary">
        <HomeHeaderTitle fontWeight="bold">Welcome to Taskly!</HomeHeaderTitle>
        <Typography variant="subtitle1">
          Organize your daily tasks, increase your productivity, and never
          forget anything.
        </Typography>
      </HomeHeader>

      {/* Feature Highlights */}
      <FeatureContainer
        container
        rowSpacing={3}
        columnSpacing={50}
        columns={{ xs: 1, md: 2 }}
      >
        <Grid size={{ xs: 1, md: 3 }} textAlign="center">
          <FeatureContainerTitle fontWeight="bold">
            Manage your activities easily
          </FeatureContainerTitle>
        </Grid>

        {/* Features */}
        {features.map((feature, index) => (
          <Grid key={index} size={1}>
            <Feature>
              <Typography variant="h6" fontWeight="bold" color="primary">
                {feature.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {feature.body}
              </Typography>
            </Feature>
          </Grid>
        ))}
      </FeatureContainer>

      <LinkButtonContainer>
        <LinkButton
          component={RouterLink}
          to={user ? "/dashboard" : "#"}
          onClick={() => !user && setAuthForm("login")}
        >
          Get Started
        </LinkButton>
      </LinkButtonContainer>
    </PageLayout>
  );
}

export default Home;
