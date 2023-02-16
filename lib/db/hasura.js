async function fetchGraphQL(operationsDoc, operationName, variables) {
  const hasuraUrl = process.env.NEXT_PUBLIC_HASURA_ADMIN_URL;
  const result = await fetch(hasuraUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      // "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikp1bGllbiIsImlhdCI6MTY3NjUzODIzNywiZXhwIjoxNjc3MTQzMDM3LCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsImFkbWluIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoibm90ampzZW1hYW4ifX0.TXa5YcndcS9eAFnnZESAlGcV1KArA0RnpgdqipiurQY",
    },
    body: JSON.stringify({
      query: operationsDoc,
      operationName: operationName,
      variables: variables,
    }),
  });

  return await result.json();
}

const operationsDoc = `
  
  query MyQuery {
    netflix_users {
      email
      id
      issuer
      publicAddress
    }
  }
`;

function executeMyMutation() {
  return fetchGraphQL(operationsDoc, "MyMutation", {});
}

function fetchMyQuery() {
  return fetchGraphQL(operationsDoc, "MyQuery", {});
}

async function startExecuteMyMutation() {
  const { errors, data } = await executeMyMutation();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log({ data });
}

// startExecuteMyMutation();

export async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(data);
}

// startFetchMyQuery();
