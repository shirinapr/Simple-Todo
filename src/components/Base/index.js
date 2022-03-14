import React from "react";
import { connect } from "react-redux";
import extracter from "../../helper/extractTopics";
import "./style.css";
import shortId from "shortid";

class SiderDemo extends React.Component {
  state = {
    collapsed: true,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  handleMenu = (topic) => {
    this.props.dispatch({
      type: "CHANGE_TOPIC",
      payload: topic,
    });
  };

  render() {
    const items = extracter(this.props.todo);

    return (
      <div>
        {items.map((topic) => (
          <span
            key={shortId.generate()}
            onClick={() => {
              this.handleMenu(topic);
            }}
          >
            {topic}
          </span>
        ))}

        <div className="site-layout">
          <div className="site-layout-background" style={{ padding: 0 }}>
            <span className="span-header">Simple Todo-list</span>
          </div>
          <div
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default connect((store) => {
  return { todo: store.todo };
})(SiderDemo);
