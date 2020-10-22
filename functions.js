function parseCandidate(candidate) {
  const addressLabel = "місце проживання:";
  const addressIndex = candidate.info.indexOf(addressLabel);
  const [education, partyMembership, employment, position] = candidate.info
    .slice(0, addressIndex - 2)
    .split(",")
    .map((i) => i.trim());

  let address = candidate.info.slice(addressIndex).replace(addressLabel, "").trim();

  delete candidate.info;

  return {
    ...candidate,
    education,
    partyMembership,
    employment,
    position,
    address,
  };
}

module.exports = { parseCandidate };
