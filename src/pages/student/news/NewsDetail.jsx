import React, { useEffect, useState } from "react";
import { Box, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { privateAxios } from "../../../service/axios";
export default function NewsDetail() {
  const [file, setFile] = useState(null);
  const [newsDetail, setNewsDetail] = useState(null);
  let { id } = useParams();
  const fetchData = async () => {
    const res = await privateAxios.get(`news/detail/${id}`);
    setNewsDetail(res.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  import(`./pdf/NewsContent${id}.pdf`).then((module) => {
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
