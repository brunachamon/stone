import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { formatCurrency } from "../utils/currency";
import { handleFetchProducts, handleRemoveProduct } from "../services/product";
import DeletionModal, {
  handleShowModal,
  handleCloseModal,
} from "./DeletionModal";

const ProductCard = ({ name, description, price, category, image, _id }) => {
  const dispatch = useDispatch();

  const handleContinue = () => {
    dispatch(handleRemoveProduct(_id));
    dispatch(handleFetchProducts());

    handleCloseModal();
  };

  return (
    <div className="lg:flex my-3">
      <div
        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      <div className="w-full border-r border-b border-l border-gray-300 lg:border-t bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-lg mb-2">{name}</div>
          <p className="text-gray-700 text-base">
            Categoria {category} - {formatCurrency(price)}
          </p>
          <p className="text-gray-700 text-base">{description}</p>
        </div>

        <div className="flex">
          <Link className="text-sky-400" to={`/products/${_id}`}>
            Editar
          </Link>
          <button className="text-red-400 ml-4" onClick={handleShowModal}>
            Remover
          </button>
        </div>

        <DeletionModal handleContinue={handleContinue} />
      </div>
    </div>
  );
};

export default ProductCard;
