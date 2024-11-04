window.addEventListener("popstate", (event) => {
    changeContent({ id: get_id_param(), save: false });
  });