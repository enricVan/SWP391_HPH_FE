import React, { useEffect, useState } from "react";
import { Box, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import newsService from "../../../service/newsService";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import dynamicModule from "./pdf/FERproject.pdf";
// import * as mod from "./pdf/*";
export default function NewsDetail() {
  const { id } = useParams();
  const newsDetail = newsService.getNewsById();
  const docs = [{ uri: dynamicModule }];
  return (
    <Box padding={1}>
      <h1 style={{ marginLeft: "8px" }}>Room Assignment Requests</h1>
      <Box component={Paper}>
        <DocViewer
          documents={docs}
          pluginRenderers={DocViewerRenderers}
        ></DocViewer>
      </Box>
    </Box>
  );
}
