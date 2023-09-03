const {
  getAllReviews,
  createReview,
  getUserReviews,
  deletReview,
  editReview
} = require('../Controllers/Reviews.controller.js');

const getReviews = async (req, res) => {
  try {
    const reviews = await getAllReviews();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las reviews.' });
  }
};

const getReviewByUser = async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ error: 'Datos del body incorrectos o unsuficientes' });
    }

    const { userId } = req.body;
    const userReviews = await getUserReviews(userId);
    res.status(201).json(getUserReviews);
  } catch (error) {
    res.status(500).json({ msg: 'Error al buscar las reviews.', error });
  }
};

const createNewReview = async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ error: 'Datos del body incorrectos o unsuficientes.' });
    }

    const { userId, reviewData } = req.body;
    const newReview = await createReview(userId, reviewData);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear la review.', error });
  }
};

const deleteReviewById = async (req, res) => {
  try {
    const id = req.params.reviewId;
    if (!id) {
      return res
        .status(400)
        .json({ error: 'Parametros incorrectos o unsuficientes.' });
    }

    const deletCount = await deletReview(id);
    if (deletCount > 0) {
      res
        .status(200)
        .json({
          msg: `La review con el id ${id}, fue eliminada satisfactoriamente.`
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: 'Error al intentar eliminar la review.', error });
  }
};

const editReviewComment = async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ error: 'Datos del body incorrectos o unsuficientes.' });
    }

    const { reviewId, commentData } = req.body;
    const editedReview = await editReview(reviewId, commentData);
    res
      .status(201)
      .json({
        msg: `Los comentarios fueron editados satisfactoriamente.`,
        editedReview
      });
  } catch (error) {
    res.status(500).json({ msg: 'Error al editar los comentarios.', error });
  }
};

module.exports = {
  getReviews,
  createNewReview,
  getReviewByUser,
  deleteReviewById,
  editReviewComment
};
