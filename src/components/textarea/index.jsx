import React from "react";
import PropTypes from "prop-types";
import radium from "radium";
import propTypes from "../../utils/propTypes";
import Input from "../input";

const styles = Object.assign({}, Input.styles, {
  height: "auto",
  minHeight: Input.styles.height,
  padding: 0,
  resize: "vertical",
});

class Textarea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: Input.height,
      hideOverflow: true,
    };

    this.onInput = this.onInput.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) { // eslint-disable-line class-methods-use-this
    return nextState.height !== nextState.maxHeight;
  }

  onInput() {
    if (this.props.onInput && typeof this.props.onInput === "function") {
      this.props.onInput();
    }

    if (this.props.autogrow) {
      const maxHeight = (this.props.maxLines * Input.lineHeight) + Input.height;

      this.textarea.style.height = Input.styles.height;

      this.setState({
        height: Math.min(this.textarea.scrollHeight, maxHeight),
        hideOverflow: Math.min(this.textarea.scrollHeight, maxHeight) < maxHeight,
      }, () => {
        this.textarea.style.height = `${this.state.height}px`;
        this.textarea.style.overflow = this.state.hideOverflow ? "hidden" : null;
      });
    }
  }

  render() {
    const props = Object.assign({}, this.props);

    delete props.autogrow;
    delete props.maxLines;

    return (
      <textarea
        {...props}
        ref={node => { this.textarea = node; }}
        onInput={this.onInput}
        style={[
          styles,
          this.props.autogrow && {
            height: Input.styles.height,
            overflow: "hidden",
            padding: `${17 / Input.fontSize}em 0 ${15 / Input.fontSize}em`,
            resize: "none",
          },
          this.props.style,
        ]}
      />
    );
  }
}

Textarea.propTypes = {
  autogrow: PropTypes.bool,
  maxLines: PropTypes.number,
  onInput: PropTypes.func,
  style: propTypes.style,
};

Textarea.defaultProps = {
  autogrow: false,
  maxLines: 3,
  onInput: null,
  style: null,
};

export default radium(Textarea);
