import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import {GitHub} from './common/GitHub';
import {ForceDirectedGraph} from './components/ForceDirectedGraph';
import { ForceGraph2D } from 'react-force-graph';
import c from './datasets/repos.json';

class App extends Component {
  state = {
    data: [12, 5, 6, 6, 9, 10],
    width: 700,
    height: 500,
    id: 'root'
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

  public componentDidMount(): void {
    const fdg = new ForceDirectedGraph();
    fdg.renderGraph(this.buildRandomData())
  }

  render() {
    const gh = new GitHub();
    gh.getRepos();
    return (<div className="App full_height_width" id="my_div">
      <Container id="my_container">
        <ForceGraph2D
          graphData={c}
          width={600}
          height={600}
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
        />
      </Container>
    </div>)
  }
}

export default App;
