const updateStatus = (itemId, status) => {
  items.map(item => {
    if (item.id === itemId) {
      item.completed = status;
    }
    return item;
  });
};

export default updateStatus;
