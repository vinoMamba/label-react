export const template = `
<!DOCTYPE html>
<html lang="zh">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>print template</title>
  <style>
    @media print {
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        background-color: rgb(176, 173, 173);
      }

      section {
        border: 1px solid black;
        page-break-after: always;
        background-color: white;
      }
    }

    @page {
      margin: 0;
      padding: 0;
    }

  </style>
</head>

<body>
  {{labelContent}}
</body>

</html>
`
