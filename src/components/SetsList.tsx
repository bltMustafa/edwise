import React, {Dispatch, SetStateAction} from "react";
import {Card, Input, Button, List, Empty, Tooltip, message} from "antd";
import {BookOutlined, PlayCircleOutlined, PlusOutlined, DeleteOutlined} from "@ant-design/icons";
import {WordSet} from "../constants/types";


interface SetsListProps {
  wordSets: WordSet[];
  setWordSets: Dispatch<SetStateAction<WordSet[]>>;
  setCurrentSet: Dispatch<SetStateAction<WordSet | null>>;
  setCurrentStep: Dispatch<SetStateAction<"sets" | "manage" | "play" | "results">>;
}


const SetsList: React.FC<SetsListProps> = ({wordSets, setWordSets, setCurrentSet, setCurrentStep}) => {

  const [newSetName, setNewSetName] = React.useState("");

  const addWordSet = () => {

    if (!newSetName.trim()) {
      message.warning("Please enter a set name");
      return;
    }

    const newSet: WordSet = {
      id: Math.random().toString(36).substr(2, 9),
      name: newSetName.trim(),
      words: [],
      difficulty: "medium",
    };
    setWordSets([...wordSets, newSet]);
    setNewSetName("");
    message.success("Set created successfully!");
  };

  return (
    <Card
      title={
        <div>
          <BookOutlined/> Word Learning Sets
        </div>
      }
      extra={
        <div style={{display: "flex", alignItems: "center"}}>
          <Input
            placeholder="New Set Name"
            value={newSetName}
            onChange={(e) => setNewSetName(e.target.value)}
            style={{width: 200, marginRight: 10}}
          />
          <Tooltip title="Create New Word Set">
            <Button type="primary" icon={<PlusOutlined/>} onClick={addWordSet}>
              Add Set
            </Button>
          </Tooltip>
        </div>
      }
    >
      {wordSets.length === 0 ? (
        <Empty description="No word sets yet. Create your first set!"/>
      ) : (
         <List
           grid={{gutter: 16, column: 3}}
           dataSource={wordSets}
           renderItem={(set) => (
             <List.Item>
               <Card
                 hoverable
                 actions={[
                   <Tooltip key="manage" title="Manage Set">
                     <BookOutlined
                       onClick={() => {
                         setCurrentSet(set);
                         setCurrentStep("manage");
                       }}
                     />
                   </Tooltip>,
                   <Tooltip key="play" title="Start Game">
                     <PlayCircleOutlined
                       onClick={() => {
                         if (set.words.length > 0) {
                           setCurrentSet(set);
                           setCurrentStep("play");
                         } else {
                           message.warning("This set has no words.");
                         }
                       }}
                     />
                   </Tooltip>,
                   <Tooltip key="delete" title="Delete Set">
                     <DeleteOutlined
                       style={{color: "red"}}
                       onClick={() => setWordSets(wordSets.filter((s) => s.id !== set.id))}
                     />
                   </Tooltip>,
                 ]}
               >
                 <Card.Meta title={set.name} description={`${set.words.length} Words`}/>
               </Card>
             </List.Item>
           )}
         />
       )}
    </Card>
  );


};

export default SetsList;
