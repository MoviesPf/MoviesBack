const field = "field is missing";
const type = "The data type is invalid";

const validationBody = ({
  title,
  overview,
  release_date,
  backdrop,
  poster,
  runtime,
  companies,
  trailer,
  adult,
  revenue,
  budget,
  cast,
  popularity,
}) => {
  if (!title) {
    throw Error(`title ${field}`);
  }
  if (!overview) {
    throw Error(`overview ${field}`);
  }
  if (!release_date) {
    throw Error(`release_date ${field}`);
  }
  if (!backdrop) {
    throw Error(`backdrop ${field}`);
  }
  if (!poster) {
    throw Error(`poster ${field}`);
  }
  if (!runtime) {
    throw Error(`runtime ${field}`);
  }
  if (!companies) {
    throw Error(`companies ${field}`);
  }
  if (!trailer) {
    throw Error(`trailer ${field}`);
  }
  if (!adult) {
    throw Error(`adult ${field}`);
  }
  if (!revenue) {
    throw Error(`revenue ${field}`);
  }
  if (!budget) {
    throw Error(`budget ${field}`);
  }
  if (!cast) {
    throw Error(`cast ${field}`);
  }
  if (!popularity) {
    throw Error(`popularity ${field}`);
  }

  //--------------------------------------------------------------
  if (title) {
    if (typeof title !== "string") {
      throw Error(`${type}`);
    }
  }
  if (overview) {
    if (typeof overview !== "string") {
      throw Error(`${type}`);
    }
  }
  if (release_date) {
    if (typeof release_date !== "string") {
      throw Error(`${type}`);
    }
  }
  if (backdrop) {
    if (typeof backdrop !== "string") {
      throw Error(`${type}`);
    }
  }
  if (poster) {
    if (typeof poster !== "string") {
      throw Error(`${type}`);
    }
  }
  if (runtime) {
    if (typeof poster !== "string") {
      throw Error(`${type}`);
    }
  }
  if (trailer) {
    if (typeof trailer !== "string") {
      throw Error(`${type}`);
    }
  }
  if (adult) {
    if (typeof adult !== "boolean") {
      throw Error(`${type}`);
    }
  }
  if (revenue) {
    if (typeof revenue !== "number") {
      throw Error(`${type}`);
    }
  }
  if (budget) {
    if (typeof budget !== "number") {
      throw Error(`${type}`);
    }
  }
  if (popularity) {
    if (typeof popularity !== "number") {
      throw Error(`${type}`);
    }
  }

  return;
};

const validationId = (id) => {
  if (!id) {
    throw Error(`id ${field}`);
  }
  if (id) {
    if (typeof id !== "number") {
      throw Error(`${type}`);
    }
  }
};

module.exports = { validationBody, validationId };
