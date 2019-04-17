import React, {Component} from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import {GitHub} from './common/GitHub';
import { ForceGraph2D } from 'react-force-graph';

interface Props {
  isOver?: boolean;
  canDrop?: boolean;
}

interface State {
  data?: any;
  height?: number;
  width?: number;
}

class App extends React.Component<Props, State> {
  private gh = new GitHub();
  constructor(props: Props) {
    super(props);
    this.gh.getRepos().then((d) => {
      this.setState({data: JSON.parse(d)})
    });
    this.state = {
      height: window.innerHeight,
      width: window.innerWidth
    };
  }

  public buildRandomData() {
    const N = 50;
    const gData: any = {
      nodes: [...Array(N).keys()].map(i => ({ id: i })),
      links: [...Array(N).keys()]
        .filter(id => id)
        .map(id => ({
          source: id,
          target: Math.round(Math.random() * (id-1))
        }))
    };
    return gData;
  }

  public renderForceGraph() {
    if(this.state.data) {
      return(<ForceGraph2D
        graphData={this.state.data}
        width={this.state.width}
        height={this.state.height}
        // backgroundColor="#393939"
        nodeId="id"
        linkDirectionalParticles="value"
        linkDirectionalParticleSpeed={d => d.value * 0.001}
        nodeAutoColorBy={"group"}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 12/globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          // ctx.fillStyle = node.color;
          ctx.fillStyle = 'midnightBlue';
          // console.log(node.color);
          ctx.fillText(label, node.x, node.y);
        }
        }
      />)
    }
  }

  render() {
    return (<div className="App full_height_width" id="my_div">
      <Container id="my_container">
        {this.renderForceGraph()}
      </Container>
    </div>)
  }
}

export default App;
