import React from "react";

import { UserList } from "./pages/UserList";
import { AppLayout } from "./layouts";

function App() {
  return (
    <AppLayout>
      <UserList />
    </AppLayout>
  );
}

export default App;
