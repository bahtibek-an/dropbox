import React from "react";
import Amplify from "aws-amplify";
import awsConfig from "./aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import UploadFile from './UploadFile';
import Files from "./Files";

Amplify.configure(awsConfig);

function App() {
  return (
    <div className="App">
      <UploadFile/>
      <Files/>
    </div>
  );
}

export default withAuthenticator(App);
