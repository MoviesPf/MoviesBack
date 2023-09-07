const Reviews = require("../Models/Reviews.model");
const Users = require("../Models/Users.model");
const Programs = require("../Models/Programs.model");

const getAllReviews = async () => {
// La funcion devuelve todas las reviews en la db.
  const allReviews = await Reviews.findAll();
  return allReviews;
};

const getUserReviews = async (userID) =>{
// La funcion devuelve todas las reviews del usuario con el id pasado por parametro.
  const reviews = await Reviews.findAll({where: {UserId: userID}});
  if (!reviews){
    throw new Error({msg:'Hubo un problema al buscar las reviews',error} );
  }
  return reviews
};


const createReview = async (programID,userID, reviewData) => {
// La funcion crea una nueva review y le asigna un usuario relacionado.
    
  const user = await Users.findByPk(userID);
  if (!user){
      throw new Error('El ID brindado no coincide con ningun usuario');
  }
  const program = await Programs.findByPk(userID);
  if (!program){
      throw new Error('El ID brindado no coincide con ningun programa');
  }

  const newReview = await Reviews.create({...reviewData, UserId: user.id, ProgramId: user.id});

  if (!newReview){
    throw new Error({msg:'Hubo un problema al crear la review',error} );
  }
  return newReview;

};

const deletReview = async (reviewID) => {

  const deletCount = await Reviews.destroy({where: {id: reviewID}});
  return deletCount;

}

const editReview = async (reviewID,newCommentsData) => {
// La funcion edita el contenido en texto de la review
  const reviewToEdit = await Reviews.findByPk(reviewID);
  if(!reviewToEdit){
    throw new Error({msg:'Hubo un problema al intentar editar la review',error} );
  }
  reviewToEdit.comments = newCommentsData;
  reviewToEdit.save()
  return reviewToEdit;
}

module.exports = {
getAllReviews,
createReview,
getUserReviews,
deletReview,
editReview
};