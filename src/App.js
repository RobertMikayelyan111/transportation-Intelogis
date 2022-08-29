import React from "react";
import { MapWrapper } from "./components/map/MapWrapper";
import { OrderPanel } from "./components/orders/OrderPanel";
import { Resize, ResizeHorizon } from "react-resize-layout";
import { Layout } from "antd";
import "./App.css";

function App() {
  const { Header, Content } = Layout;

  return (
    <Layout className="site-layout">
      <Header
        className="site-layout-background header"
        style={{
          padding: 0,
          textAlign: "center",
        }}
      >
        <h1 className="head"> Заявки на грузоперевозки </h1>
      </Header>
      <Content
        className="content"
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 600,
        }}
      >
        <Resize>
          <ResizeHorizon
            width={"30%"}
            minWidth={"60%"}
            className={"containerLeft"}
          >
            <OrderPanel />
          </ResizeHorizon>
          <ResizeHorizon
            width={"100%"}
            minWidth={"20%"}
            className={"containerCenter"}
          >
            <MapWrapper />
          </ResizeHorizon>
        </Resize>
      </Content>
    </Layout>
  );
}

export default App;
