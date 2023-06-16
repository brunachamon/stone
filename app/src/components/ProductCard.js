import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/currency";

const ProductCard = ({ name, description, price, category, image, _id }) => (
  <div className="lg:flex my-3">
    <div
      className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
      style={{ backgroundImage: `url(${image})` }}
    ></div>

    <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
      <div className="mb-8">
        <div className="text-gray-900 font-bold text-lg mb-2">{name}</div>
        <p className="text-gray-700 text-base">
          Categoria {category} - {formatCurrency(price)}
        </p>
        <p className="text-gray-700 text-base">{description}</p>
      </div>

      <Link className="text-sky-400" to={`/products/${_id}`}>
        Editar
      </Link>
    </div>
  </div>
);

export default ProductCard;
