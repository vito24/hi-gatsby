import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Prism from 'prismjs';

import './index.less';

class Playground extends Component {
  state = {
    isExpand: false
  };

  handleExpand = () => {
    this.setState({ isExpand: !this.state.isExpand });
  };

  render() {
    const { isExpand } = this.state;
    const { children, __code } = this.props;
    const highlightCode = Prism.highlight(__code, Prism.languages.javascript, 'javascript');

    return (
      <div className="code-box">
        <div className="code-box-demo">{children}</div>
        <div className="code-box-actions">
          <CopyToClipboard text={__code} onCopy={() => console.log('copied!')}>
            <button>copy</button>
          </CopyToClipboard>
          <button onClick={this.handleExpand}>expand</button>
        </div>
        {isExpand && (
          <pre className="language-javascript">
            <code
              className="language-javascript"
              dangerouslySetInnerHTML={{ __html: highlightCode }}
            />
          </pre>
        )}
      </div>
    );
  }
}

export default Playground;
