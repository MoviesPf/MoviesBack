const Reviews = require("../Models/Reviews.model");
const Users = require("../Models/Users.model");

const getAllReviews = async () => {
// La funcion devuelve todas las reviews en la db.
  const allReviews = await Reviews.findAll();
  return allReviews;
};

const getUserReviews = async (userID) =>{
// La funcion devuelve todas las reviews del usuario con el id pasado por parametro.
    try {
        const reviews = await Reviews.findAll({where: {UserId: userID}});
        return reviews

      } catch (error) {
        throw new Error({msg:'Hubo un problema al buscar las reviews',error} );
    };
};


const createReview = async (userID, reviewData) => {
// La funcion crea una nueva review y le asigna un usuario relacionado.
    try {
        const user = await Users.findByPk(userID);
        if (!user){
            throw new Error('El ID brindado no coincide con ningun usuario');
        }
        const newReview = await Reviews.create({...reviewData, UserId: user.id});
        return newReview;
  
    } catch (error) {
        throw new Error({msg:'Hubo un problema al crear la review',error} );
    };
};

const deletReview = async (reviewID) => {
// Elimina una review por id
    try {
        const deletCount = await Reviews.destroy({where: {id: reviewID}});
        return deletCount;

      } catch (error) {
        throw new Error({msg:'Hubo un problema al intentar eliminar la review',error} );
      }
}

const editReview = async (reviewID,newCommentsData) => {
// La funcion edita el contenido en texto de la review
    try {
        const reviewToEdit = await Reviews.findByPk(reviewID);
        reviewToEdit.comments = newCommentsData;
        reviewToEdit.save()
        return reviewToEdit;

      } catch (error) {
        throw new Error({msg:'Hubo un problema al intentar editar la review',error} );
      }
}

module.exports = {
getAllReviews,
createReview,
getUserReviews,
deletReview,
editReview
};