// import HttpError from 'http-errors';

export default function errorHandler(err, req, res, next) {
  try {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
    });

    return;
  } catch {
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
      data: err.message,
    });
  }
}

// export function errorHandler(err, req, res, next) {
//   if (err instanceof HttpError) {
//     res.status(err.status).json({
//       status: err.status,
//       message: err.name,
//       data: err,
//     });

//     return;
//   }

//   res.status(500).json({
//     status: 500,
//     message: 'Internal server error',
//     data: err.message,
//   });
// }
