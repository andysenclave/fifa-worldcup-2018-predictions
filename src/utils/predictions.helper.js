const composeGroups = data => {
  if(data === undefined || data.length === 0) return undefined;
  else {
    const groups = data.reduce((groupObj, teamInfo) => {
      const group_pos = groupObj.findIndex(group => group.name === `Group ${teamInfo.group_letter}`);
      if(group_pos > -1) {
        groupObj[group_pos].teams.push({
          name: teamInfo.country,
          code: teamInfo.fifa_code
        });
      } else {
        groupObj.push({
          name: `Group ${teamInfo.group_letter}`,
          teams: [{
            name: teamInfo.country,
            code: teamInfo.fifa_code
          }]
        });
      }
      return groupObj;
    }, []);
    return groups;
  }
}

export { composeGroups };