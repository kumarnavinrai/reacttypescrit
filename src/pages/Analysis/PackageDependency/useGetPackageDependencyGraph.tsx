import { useEffect, useState } from 'react';
import { getPackageDependencyGraph } from '../../../api/Reports';
import { useShowApplicationError } from '../../../components/common/useShowApplicationError';
import { EdgeData, IPackageDependencyGraphData, NodeData, Payload } from './types';

/**
 * Fetching Package Dependency Graph (nodes and edges)
 */
const useGetPackageDependencyGraph = (landscapeId: string, entryDevClass: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [packageDependencyGraphData, setPackageDependencyGraphData] = useState<IPackageDependencyGraphData>({
    nodes: [] as NodeData[],
    edges: [] as EdgeData[],
    pageIndex: 0,
    pageRowCount: 0,
    totalCount: 0,
  });

  const { showApplicationError } = useShowApplicationError();

  useEffect(() => {
    const mapToPackageDependencyGraph = (responseData: any) => {
      let nodes: NodeData[] = [];
      let edges: EdgeData[] = [];

      //Parse Nodes
      if (responseData) {
        if (responseData.nodes) {
          for (var node of responseData.nodes) {
            nodes.push({
              id: node.id,
              label: node.label,
              summarizedNode: node.summarizedNode,
              color: {
                border: node.payload?.onlyDdDependencies === true ? '#5d4235' : '#4782da',
                background: '#ffffff',
                highlight: {
                  border: node.payload?.onlyDdDependencies === true ? '#5d4235' : '#4782da',
                  background: node.payload?.onlyDdDependencies === true ? '#ece3df' : '#D2E5FF',
                },
                hover: {
                  border: node.payload?.onlyDdDependencies === true ? '#5d4235' : '#4782da',
                  background: '#D2E5FF',
                },
              },
              font: {
                color: node.payload?.onlyDdDependencies === true ? '#5d4235' : '#4782da',
                size: 14,
              },
              payload: mapToPayloadData(node.payload),
            });
          }
        }

        //Parse Edges
        if (responseData.edges) {
          for (var edge of responseData.edges) {
            edges.push({
              from: edge.from,
              to: edge.to,
              label: edge.label,
              title: `${edge.payload?.countOfReferences} calls`,
              payload: mapToPayloadData(edge.payload),
            });
          }
        }

        //Set the state of the network data
        setPackageDependencyGraphData({
          nodes: nodes,
          edges: edges,
          pageIndex: responseData.pageNum,
          pageRowCount: responseData.numItems,
          totalCount: responseData.totalCount,
        });
      }
    };

    const mapToPayloadData = (payload: any): Payload => {
      const data: Payload = {
        uuid: payload?.uuid,
        entryDevclass: payload?.entryDevclass,
        entryDevcText: payload?.entryDevcText,
        objectDevclass: payload?.objectDevclass,
        objectDevcText: payload?.objectDevcText,
        pdevc: payload?.pdevc,
        pdevcText: payload?.pdevcText,
        component: payload?.component,
        componentText: payload?.componentText,
        dlvunit: payload?.dlvunit,
        onlyDdDependencies: payload?.onlyDdDependencies,
        countOfReferences: payload?.countOfReferences,
        reverseCountOfReferences: payload?.reverseCountOfReferences,
      };

      return data;
    };

    if (landscapeId && entryDevClass) {
      getPackageDependencyGraph(landscapeId, decodeURIComponent(entryDevClass))
        .then((responseData: any) => {
          mapToPackageDependencyGraph(responseData);
          setIsLoading(false);
        })
        .catch((error: any) => {
          setIsLoading(false);
          showApplicationError(error, 'Error in fetching Package dependency graph');
        });
    }
  }, [landscapeId, entryDevClass, showApplicationError]);

  return { isLoading, packageDependencyGraphData };
};

export default useGetPackageDependencyGraph;
