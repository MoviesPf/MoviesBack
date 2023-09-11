const Programs = require("../Models/Programs.model");
const Reviews = require("../Models/Reviews.model");
const Users = require("../Models/Users.model");
const Genres = require("../Models/Genres.model")

const getAllReviews = async () => {
  // La funcion devuelve todas las reviews en la db.
  const allReviews = await Reviews.findAll();
  return allReviews;
};

const getUserReviews = async (id) => {
  // La funcion devuelve todas las reviews del usuario con el id pasado por parametro.
  const reviews = await Reviews.findAll({ where: { UserId: id }});
  const reviewsAndPrograms = [];

  for (i = 0; i < reviews.length; i++) {
      const oneReview = reviews[i];
      const programReview = await Programs.findOne({
        where: {id: oneReview.ProgramId }, include: [{model: Genres, through: { attributes: []}}]
      })
      const oneReviewFinal = {
        id: oneReview.id,
        rating: oneReview.rating,
        comments: oneReview.comments,
        date: oneReview.date,
        program: {
          id: programReview.id,
          title: programReview.title,
          release_date: programReview.release_date,
          poster: programReview.poster,
          Genres: programReview.Genres
        }
      }
      reviewsAndPrograms.push(oneReviewFinal)
    }
    if (!reviews) {
      throw new Error({ msg: "Hubo un problema al buscar las reviews", error });
    }
    const totalreviews = reviewsAndPrograms.length
    return {
      totalreviews,
      reviewsAndPrograms
    }
};

const createReview = async (userID, reviewData, ProgramId) => {
  // La funcion crea una nueva review y le asigna un usuario relacionado.

  const user = await Users.findByPk(userID);
  if (!user) {
    throw new Error("El ID brindado no coincide con ningun usuario");
  }
  const newReview = await Reviews.create({
    ...reviewData,
    UserId: user.id,
    ProgramId,
  });
  if (!newReview) {
    throw new Error({ msg: "Hubo un problema al crear la review", error });
  }
  return newReview;
};

const deletReview = async (reviewID) => {
  const deletCount = await Reviews.destroy({ where: { id: reviewID } });
  return deletCount;
};

const editReview = async (reviewID, newCommentsData) => {
  // La funcion edita el contenido en texto de la review
  const reviewToEdit = await Reviews.findByPk(reviewID);
  if (!reviewToEdit) {
    throw new Error({
      msg: "Hubo un problema al intentar editar la review",
      error,
    });
  }
  reviewToEdit.comments = newCommentsData;
  reviewToEdit.save();
  return reviewToEdit;
};

module.exports = {
  getAllReviews,
  createReview,
  getUserReviews,
  deletReview,
  editReview,
};
