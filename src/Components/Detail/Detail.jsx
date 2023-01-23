import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, setLoader } from "../../Redux/Actions";
import Loader from "../Loader/Loader";
import "./Detail.css";
import { Rating } from "@material-ui/lab";

const Detail = (props) => {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const details = useSelector((state) => state.detail);
  const loading = useSelector((state) => state.loader);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(setLoader());
    };
  }, [dispatch]);

  const promedio = (arr) => {
    let suma = 0;
    for (let x = 0; x < arr.length; x++) {
      suma += parseInt(arr[x]);
    }
    const resultado = suma / details.rating.length;
    return resultado;
  };

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(setLoader());
    };
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : details ? (
        <div>
          <section className="container sproduct my-5 pt-5">
            <div className="row">
              <div className="col-lg-5 col-md-12 col-12">
                <div className="image-container">
                  <img
                    className="image-detail"
                    src={details.image.secure_url}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-12">
                <h2>{details.name}</h2>
                <h3>Marca: {details.brand}</h3>
                <h2>$ {details.price}</h2>
                <div className="stock">
                  {details.stock > 10 ? (
                    <h3 className="stock-disponible">
                      Stock disponible ({details.stock})
                    </h3>
                  ) : (
                    <h3>Poco stock disponible ({details.stock})</h3>
                  )}
                </div>
                <br />
                <button type="button" className="btn btn-danger">
                  Añadir al carrito
                </button>
                <div className="rating">
                  <Rating
                    name="half-rating-read"
                    defaultValue={details.rating ? promedio(details.rating) : 0}
                    precision={0.5}
                    readOnly
                  />

                  <div className="product-description-container">
                    <h3 className="text-detai mt-5 mb-5">
                      Descripción:
                      <p className="p-detail">{details.description}</p>{" "}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <p>No se pudo cargar el detalle</p>
      )}
    </>
  );
};

export default Detail;
