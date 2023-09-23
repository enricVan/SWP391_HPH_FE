import React from "react";
import { Box, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import newsService from "../../../service/newsService";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import * as mod from "./pdf/*";
export default function NewsDetail() {
  const { id } = useParams();
  const newsDetail = newsService.getNewsById();
  const docs = [{ uri: mod }];
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
