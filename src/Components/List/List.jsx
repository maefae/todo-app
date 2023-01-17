import { Badge, Card, CloseButton, Group, Pagination, Text } from '@mantine/core';
import { useContext, useState } from 'react';
import { If, Then, Else } from 'react-if';
import { AuthContext } from '../../Context/Auth/index'
import { SettingsContext } from '../../Context/SettingsContext';
import Auth from '../Auth/auth';

const List = ({ list, toggleComplete, deleteItem }) => {
  const { can, isLoggedIn } = useContext(AuthContext)
  const { showComplete, pageItems } = useContext(SettingsContext);
  const [page, setPage] = useState(1);

  //pagination
  const listToRender = showComplete ? list : list.filter(item => !item.complete);
  const listStart = pageItems * (page - 1);
  const listEnd = listStart + pageItems
  const pageCount = Math.ceil(listToRender.length / pageItems);
  const displayList = listToRender.slice(listStart, listEnd);

  return (
    <>
      {displayList.map(item => (
        <Card key={item._id} withBorder shadow="md" mb='sm' >
          <Card.Section withBorder>
            <Group position='apart'>
              <Group>
                <If condition={isLoggedIn && can('update')}>
                  <Then>

                    <Badge
                      color={item.complete ? "red" : "green"}
                      variant="filled"
                      onClick={() => toggleComplete(item)}
                      m="3px"
                    >

                      {item.complete ? 'Complete' : 'Pending'}
                    </Badge>

                  </Then>
                  <Else>
                    <Badge
                      color={item.complete ? "red" : "green"}
                      variant="filled"
                      m="3px"
                    >

                      {item.complete ? 'Complete' : 'Pending'}
                    </Badge>
                  </Else>
                </If>
                <Text>{item.assignee}</Text>
              </Group>
              <Auth capability="delete">
                <CloseButton title="Close Todo Item"
                  onClick={() => deleteItem(item._id)} />
              </Auth>
            </Group>
          </Card.Section>
          <Text mt="sm">{item.text}</Text>
          <Text align="right">Difficulty: {item.difficulty}</Text>

        </Card>
      ))}

      <Pagination page={page} onChange={setPage} total={pageCount} />
    </>
  )
};

export default List;