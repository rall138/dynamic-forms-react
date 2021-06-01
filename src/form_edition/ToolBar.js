import React from "react"
import PropTypes from "prop-types"


const styles = {
  toolBarWrapper:{
    width:200,
    marginTop:15,
  },
  toolBar:{
    backgroundColor:'#f4f1de',
    padding:5,
  },
  toolBarBody:{
    marginTop:5,
  },
  toolBarItem:{
    color:'#284b63',
    fontSize:14,
    fontFamily:'monospace',
  },
  toolBarTitle:{
    color:'#284b63',
    fontSize:16,
    fontFamily:'monospace',
    textAlign:'center',

  },
}


class ToolBar extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div style={styles.toolBarWrapper}>
          <div style={styles.toolBar}>
            <div style={styles.toolBarTitle}>Tool set</div>
            <div style={styles.toolBarBody}>
              <ul>
                <li style={styles.toolBarItem}>Input element</li>
                <li style={styles.toolBarItem}>Text element</li>
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ToolBar
