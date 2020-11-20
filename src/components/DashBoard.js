import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from 'uuid';

const itemsFromBackend = [
  { id: uuid(), content: "Card 1" },
  { id: uuid(), content: "Card 2" },
  { id: uuid(), content: "Card 3" },
  { id: uuid(), content: "Card 4" },
  { id: uuid(), content: "Card 5" }
];

const columnsFromBackend = {
  [uuid()]: {
    name: "Source",
    items: itemsFromBackend
  },  
  [uuid()]: {
    name: "Destination",
    items: []
  }
};


const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};



function DashBoard() {
  const [columns, setColumns] = useState(columnsFromBackend);

  const [newListName, setNewListName] = React.useState('')
    const createNewList = () => {
        setColumns({
          ...columns,
          [uuid()]: {
            name: newListName,
            items: []
          }
        })
        
        setNewListName('')
        
    }
  return (

    <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <input type="text" value={newListName} onChange= {(e) => setNewListName(e.target.value) } placeholder="Add new list" />
                    <input type="submit" value="Add" onClick={createNewList}/>
                </div>
            </div>
            <div className="row">

            <div style={{ display: "flex", justifyContent: "center", height: "100%", width: "100%"}}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 12 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 8,
                          width: 500,
                          minHeight: 600
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#00c853"
                                        : "#9933CC",
                                      color: "white",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>


            </div>
            
    </div>




    
  );
}

export default DashBoard;