import React, { useContext, useEffect, useState } from 'react';
import useForm from '../../hooks/form.js';
import { Card, createStyles, Grid, Slider, Text, TextInput, Button } from '@mantine/core';

import { v4 as uuid } from 'uuid';
import { SettingsContext } from '../../Context/SettingsContext.jsx';
import List from '../List/List';
import Auth from '../Auth/auth.js';
import axios from 'axios';

const useStyles = createStyles((theme) => ({
  h1: {
    backgroundColor: theme.colors.gray[8],
    color: theme.colors.gray[0],
    width: '80%',
    margin: 'auto',
    fontSize: theme.fontSizes.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
  }
}));

const ToDo = () => {
  const { classes } = useStyles();

  const { showComplete, pageItems, sort } = useContext(SettingsContext)
  console.log('todo: ', showComplete, pageItems, sort)

  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  async function addItem(item) {
    item.complete = false;
    console.log(item);
    // do a post, get response data and set that into state so we have correct _id
    const config = {
      url: '/todo',
      baseURL: 'https://api-js401.herokuapp.com/api/v1',
      method: 'post',
      data: item
    }
    const response = await axios()
    setList([...list, response.data]);
  }

  async function deleteItem(id) {
    const config = {
      url: `/todo/${id}`,
      baseURL: 'https://api-js401.herokuapp.com/api/v1',
      method: 'delete',
    }
    const response = await axios(config)
    getList();

    const items = list.filter(item => item._id !== id);
    setList(items);
  }

  async function toggleComplete(item) {
    const complete = !item.complete
    const config = {
      url: `/todo/${item._id}`,
      baseURL: 'https://api-js401.herokuapp.com/api/v1',
      method: 'put',
      data: { ...item, complete }
    }
    const response = await axios(config)
    console.log('updated: ', response.data);
    getList();

    // const items = list.map(item => {
    //   if (item._id === id) {
    //     item.complete = !item.complete;
    //   }
    //   return item;
    // });

    // setList(items);

  }

  async function getList() {
    const config = {
      url: '/todo',
      baseURL: 'https://api-js401.herokuapp.com/api/v1',
      method: 'get',
    }
    let response = await axios(config);
    setList(response.data.results);
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily. 
    // disable code used to avoid linter warning 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [list]);

  useEffect(() => {
    (async () => {
      const config = {
        url: '/todo',
        baseURL: 'https://api-js401.herokuapp.com/api/v1',
        method: 'get',
      }
      let response = await axios(config);
      setList(response.data.results);
    })()
  }, []);

  return (
    <>
      <h1 data-testid="todo-h1" className={classes.h1}>To Do List: {incomplete} items pending</h1>

      <Grid style={{ width: '80%', margin: 'auto' }}>
        <Auth capability="create">
          <Grid.Col xs={12} sm={4}>
            <Card withBorder>
              <form onSubmit={handleSubmit}>

                <h2>Add To Do Item</h2>
                <TextInput
                  name="text"
                  placeholder="Item Details"
                  onChange={handleChange}
                  label="To Do Item"
                />

                <TextInput
                  name="assignee"
                  placeholder="Assignee Name"
                  onChange={handleChange}
                  label="Assigned To"
                />

                <Text>Difficulty</Text>
                <Slider
                  name='difficulty'
                  onChange={handleChange}
                  min={1}
                  max={5}
                  step={1}
                  defaultValue={defaultValues.difficulty}
                />

                <Button type="submit">Add Item</Button>
              </form></Card>
          </Grid.Col>
        </Auth>
        <Auth capability="read">
          <Grid.Col xs={12} sm={8}>
            <List
              list={list}
              toggleComplete={toggleComplete}
              deleteItem={deleteItem}
            />

          </Grid.Col>
        </Auth>
      </Grid>

    </>
  );
};

export default ToDo;