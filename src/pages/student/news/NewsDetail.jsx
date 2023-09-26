import React, { useEffect, useState } from "react";
import { Box, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import newsService from "../../../service/newsService";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
// import * as mod from "./pdf/*";
export default function NewsDetail() {
  const [file, setFile] = useState(null);
  let { id } = useParams();
  const newsDetail = newsService.getNewsById(Number(id));
  console.log(newsDetail, id);
  import(`./pdf/${newsDetail.file}`).then((module) => {
    setFile(module.default);
  });
  const docs = [{ uri: file, fileName: "Announcement" }];
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
