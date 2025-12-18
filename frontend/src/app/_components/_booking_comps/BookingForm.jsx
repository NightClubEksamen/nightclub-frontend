"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const TABLES = [
  { id: "1", maxGuests: 4 },
  { id: "2", maxGuests: 4 },
  { id: "3", maxGuests: 6 },
  { id: "4", maxGuests: 4 },
  { id: "5", maxGuests: 8 },
  { id: "6", maxGuests: 4 },
  { id: "7", maxGuests: 4 },
  { id: "8", maxGuests: 6 },
  { id: "9", maxGuests: 4 },
  { id: "10", maxGuests: 8 },
  { id: "11", maxGuests: 4 },
  { id: "12", maxGuests: 4 },
  { id: "13", maxGuests: 6 },
  { id: "14", maxGuests: 4 },
  { id: "15", maxGuests: 8 },
];

export default function BookingForm({ onSubmitReservation, selectedTable, bookedTables, onDateChange }) {
  // ADDED receive props from parent
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue, // ADDEd to update table Number
    formState: { errors },
  } = useForm();

  const values = watch();
  const [reservedTables, setReservedTables] = useState([]);
  const selectedDate = watch("date"); // ADDED read current date from the form
  const chosenTable = watch("table");
  const chosenGuests = watch("guests");
  const tableMaxGuests = TABLES.find((table) => table.id === chosenTable)?.maxGuests;

  console.log("Selected table:", chosenTable);
  console.log("Guests:", chosenGuests);
  console.log("Max allowed:", tableMaxGuests);
  console.log("Errors:", errors);

  // ADDED send data to API
  const onSubmit = (data) => {
    // ADDED  do not send if table is already booked
    if (bookedTables && bookedTables.includes(data.table)) {
      alert("This table is already reserved on that date. Please choose another table.");
      return;
    }

    if (tableMaxGuests && data.guests > tableMaxGuests) {
      console.log("guests and table error", {
        table: data.table,
        guests: data.guests,
        max: tableMaxGuests,
      });
    }
    onSubmitReservation(data, reset);
  };

  // ADDE when user clicks a table in the grid, update the table number in form
  useEffect(() => {
    if (selectedTable) {
      setValue("Table Number", selectedTable);
    }
  }, [selectedTable, setValue]);

  // ADDEd notify parent component when date changes, so it can fetch reservations
  useEffect(() => {
    if (onDateChange) {
      onDateChange(selectedDate || null);
    }
  }, [selectedDate, onDateChange]);

  useEffect(() => {
    if (!selectedDate) return;

    async function fetchReservations() {
      const res = await fetch(`http://localhost:4000/reservations?date=${selectedDate}`);
      const data = await res.json();
      console.log("Reservations for selected date: ", data);

      const takenTables = data.map((reserved) => reserved.table);
      console.log("Reserved tables: ", takenTables);
      setReservedTables(takenTables);
    }

    fetchReservations();
  }, [selectedDate]);

  return (
    <>
      <main className="max-w-6xl place-self-center">
        <h1>
          <b className="text-2xl md:text-4x1">book a table</b>
        </h1>
        <form className="grid grid-cols-1 gap-5 md:grid-cols-2 grid-rows-auto" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="form-field">
            <label htmlFor="name">Your Name</label>
            <input id="name" required type="text" placeholder="Spritney Biers" className={`form-input ${values["Your Name"] ? "is-filled" : ""}`} {...register("Your Name", { required: true })} />
          </div>

          {/* Email */}
          <div className="form-field">
            <label htmlFor="email">Your Email</label>
            <input id="email" required type="text" placeholder="mail@gmail.com" className={`form-input ${values["Your Email"] ? "is-filled" : ""}`} {...register("Your Email", { required: true })} />
          </div>

          {/* Table Number */}
          <div className="form-field">
            <label htmlFor="table">Table Number</label>
            <select id="table" required defaultValue={""} /*den vælger option med value=""*/ className={`form-input ${values["Table Number"] ? "is-filled" : ""}`} {...register("table", { required: true })}>
              <option value="" disabled /*gør at denne option ikke kan vælges ved drop-down*/>
                1 - 15
              </option>
              <option value="0" disabled>
                The table number determines amount of guests
              </option>

              {/*options/tables genereres via TABLES(=array af nr/id + max guests) 
                  & hvis table/date reserveret = option disabled */}
              {TABLES.map((table) => (
                <option key={table.id} value={table.id} disabled={reservedTables.includes(table.id)}>
                  {/*option har normalt "max antal", men hvis table=reserved sættes not available ind */}
                  Table {table.id} {reservedTables.includes(table.id) ? "(not available this date)" : `(max ${table.maxGuests} guests)`}
                </option>
              ))}
            </select>

            {/*respons / note = tager max gæster og valgte gæster, hvis de er større/højere end max gæster &toggles& teskt, som viser hvor mange gæster er okay*/}
            {tableMaxGuests && chosenGuests > tableMaxGuests && <b className="text-[FF2A70] text-[0.70rem] font-thin col-span-2">This table allows max {tableMaxGuests} guests.</b>}
          </div>

          {/* Number of Guests */}
          <div className="form-field">
            <label htmlFor="guests">Number of Guests</label>
            <input id="guests" required type="number" placeholder="min 1, max 8" className={`form-input ${values["Number of Guests"] ? "is-filled" : ""}`} min={1} max={8} {...register("guests", { required: true, validate: (value) => !tableMaxGuests || value <= tableMaxGuests || `Max ${tableMaxGuests} guests for this table` })} />

            {/*respons / note = tager max gæster og valgte gæster er højere/større end max gæster &toggels& tekst, som viser hvor mange gæster er okay*/}
            {tableMaxGuests && chosenGuests > tableMaxGuests && <b className="text-[FF2A70] text-[0.70rem] font-thin col-span-2">The table can not seat above {tableMaxGuests} guests.</b>}
          </div>

          {/* Date */}
          <div className="form-field">
            <label htmlFor="date">Select Date</label>
            <input id="date" required type="date" className={`form-input ${values["Select Date"] ? "is-filled" : ""}`} {...register("date", { required: true })} />

            {/*respons / note = tager længden/antal af reseveret borde og hvis der er højere/flere end 0 &toggels& tekst, som viser hvis og hvilke tables som er reserved ved valgt date*/}
            {reservedTables.length > 0 && <b className="text-[FF2A70] text-[0.70rem] font-thin col-span-2">These tables are already reserved: {reservedTables.join(", ")}</b>}
          </div>

          {/* Phone */}
          <div className="form-field">
            <label htmlFor="phone">Your Mobile Number</label>
            <input id="phone" required type="tel" placeholder="12 34 56 78" className={`form-input ${values["Your Mobile Number"] ? "is-filled" : ""}`} {...register("Your Mobile Number", { required: true })} />
          </div>

          {/* Comment */}
          <div className="form-field form-comment md:col-span-2">
            <label htmlFor="comment">Your Comment</label>
            <textarea id="comment" className="form-input form-comment pl-0!" {...register("Your Comment", { maxLength: 250 })} />
          </div>

          {/* Submit */}
          <input className="form-button" type="submit" value="reserve" disabled={tableMaxGuests && chosenGuestsGuests > tableMaxGuests} />
        </form>
      </main>
    </>
  );
}

/*

const onSubmit = (data) => {
    if (tableMaxGuests && data.guests > tableMaxGuests) {
      console.log("guests and table error", {
        table: data.table,
        guests: data.guests,
        max: tableMaxGuests,
      });
    }

    onSubmitReservation(data, reset);
  };

  const [reservedTables, setReservedTables] = useState([]);
  const selectedDate = watch("date");

  useEffect(() => {
    if (!selectedDate) return;

    async function fetchReservations() {
      const res = await fetch(`http://localhost:4000/reservations?date=${selectedDate}`);
      const data = await res.json();
      console.log("Reservations for selected date: ", data);

      const takenTables = data.map((reserved) => reserved.table);
      console.log("Reserved tables: ", takenTables);
      setReservedTables(takenTables);
    }

    fetchReservations();
  }, [selectedDate]);



*/
