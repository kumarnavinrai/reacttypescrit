import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Network, Options } from 'vis-network';
import { DataSet } from 'vis-network/standalone';
import '../../../common/styles/vis-network.css';
import { useSetNotification } from '../../../components/notification/useNotification';
import { IPackageDependencyNetworkGraphProps } from './types';
import useGetPackageDependencyGraph from './useGetPackageDependencyGraph';

const PackageDependencyNetworkGraph = (props: IPackageDependencyNetworkGraphProps) => {
  const { groupId, landscapeId, entryDevClassParam, setSelectedNode } = props;
  //This will store the current node selection and previous node selection
  const [entryDevClass, setEntryDevClass] = useState({ current: entryDevClassParam, previous: '' });

  const container = useRef<HTMLInputElement | null>(null);
  const network = useRef<Network | null>(null);

  const { packageDependencyGraphData, isLoading } = useGetPackageDependencyGraph(landscapeId, entryDevClass.current);
  const setMessage = useSetNotification();
  const history = useHistory();

  const options: Options = useMemo(() => {
    return {
      autoResize: true,
      nodes: {
        shape: 'ellipse',
        font: {
          color: '#4782da',
          size: 14,
        },
        heightConstraint: {
          minimum: 30,
        },
        widthConstraint: {
          minimum: 160,
        },
        shadow: true,
        scaling: {
          label: {
            enabled: true,
          },
        },
        borderWidth: 1,
        borderWidthSelected: 2,
        color: {
          border: '#4782da',
          background: '#ffffff',
          highlight: {
            border: '#4782da',
            background: '#D2E5FF',
          },
          hover: {
            border: '#4782da',
            background: '#D2E5FF',
          },
        },
      },
      edges: {
        length: 300,
        width: 2,
        font: {
          color: '#4782da',
          size: 18, // px
          strokeWidth: 2, // px
          align: 'middle',
        },
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 1,
            type: 'arrow',
          },
        },
        arrowStrikethrough: false,
        color: {
          color: '#4782da',
          highlight: '#4782da',
        },
        shadow: true,
      },
      interaction: {
        navigationButtons: true,
        keyboard: true,
      },
      layout: {
        randomSeed: 17,
        improvedLayout: true,
      },
    };
  }, []);

  const nodes = useMemo(() => {
    return new DataSet(packageDependencyGraphData.nodes);
  }, [packageDependencyGraphData.nodes]);

  const edges = useMemo(() => {
    return new DataSet(packageDependencyGraphData.edges as any[]);
  }, [packageDependencyGraphData.edges]);

  const networkDoubleClickHandler = useCallback(
    (params: any) => {
      params.event = '[original event]';
      var ids = params.nodes;
      var clickedNodes = nodes.get(ids);

      if (clickedNodes && clickedNodes.length > 0 && clickedNodes[0].id && clickedNodes[0].summarizedNode === false) {
        //setEntryDevClass(clickedNodes[0].id);
        setEntryDevClass((i) => ({ current: clickedNodes[0].id, previous: i.current }));
      }
    },
    [nodes]
  );

  const networkClickHandler = useCallback(
    (params: any) => {
      params.event = '[original event]';
      var ids = params.nodes;
      var clickedNodes = nodes.get(ids);
      if (clickedNodes && clickedNodes.length > 0) {
        setSelectedNode(clickedNodes[0]);
      }
    },
    [nodes, setSelectedNode]
  );

  useEffect(() => {
    if (isLoading === false) {
      const networkData = { nodes: nodes, edges: edges };

      network.current = container.current && new Network(container.current, networkData, options);

      network?.current?.on('click', networkClickHandler);

      network?.current?.on('doubleClick', networkDoubleClickHandler);
    }
  }, [container, network, isLoading, nodes, edges, options, networkClickHandler, networkDoubleClickHandler]);

  useEffect(() => {
    if (isLoading === false && packageDependencyGraphData.nodes.length <= 0) {
      setMessage.setMessageModel('No data found for the selected node.', 'info');
      setEntryDevClass((i) => ({ current: i.previous, previous: '' }));
    }
  }, [isLoading, packageDependencyGraphData.nodes.length, setMessage]);

  useEffect(() => {
    if (isLoading === false) {
      //Set the summarized node in the details panel
      const summarizedNode = packageDependencyGraphData.nodes.find((x) => x.summarizedNode === true);
      setSelectedNode(summarizedNode || null);
    }
  }, [isLoading, packageDependencyGraphData.nodes, setSelectedNode]);

  useEffect(() => {
    history.push(`/packagedependency/graph/${groupId}/${landscapeId}/${entryDevClass.current}`);
  }, [entryDevClass, groupId, history, landscapeId]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Card>
        <CardContent>
          <div ref={container} style={{ height: '75vh' }} />
        </CardContent>
      </Card>
    </>
  );
};

export default PackageDependencyNetworkGraph;
