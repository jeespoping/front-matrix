import React from "react";
import Logo from "../../assets/jpg/cliame.jpg";
import { Container, Grid, GridColumn, Image } from "semantic-ui-react";
import "./Nav.scss";

export default function Nav({ titulo, version }) {
  return (
    <div className="nav">
      <Container>
        <Grid>
          <Grid.Column width={2}>
            <Image src={Logo} alt="Las americas" />
          </Grid.Column>
          <GridColumn width={14}>
            <Grid>
              <GridColumn className="nav-1">
                <h1>{titulo}</h1>
              </GridColumn>
            </Grid>
            <Grid>
              <GridColumn className="nav-2">
                <p>{version}</p>
              </GridColumn>
            </Grid>
          </GridColumn>
        </Grid>
      </Container>
    </div>
  );
}
