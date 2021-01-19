import React from 'react';

function ListItem(props: { value: number }) {
  return (
    <>
      <li>{props.value}</li>
    </>
  );
}

function FragmentDemo() {
  return (
    <ul>
      {Array(9)
        .fill(0)
        .map((_, index) => (
          <ListItem value={index} />
        ))}
    </ul>
  );
}

export default () => {
  return (
    <>
      <h2>Fragment 示例</h2>
      <FragmentDemo />
    </>
  );
};
