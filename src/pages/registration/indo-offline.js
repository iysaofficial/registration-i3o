"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function IndonesiaOffline() {
  const [selectedMaxNamaLengkap, setselectedMaxNamaLengkap] = useState("");
  const maxNameChars = 180; // batasan maksimal karakter
  const [selectedMaxProject, setselectedMaxProject] = useState("");
  const [selectedNamaSekolah, setselectedNamaSekolah] = useState("");
  const maxSchoolChars = 500; // batasan maksimal karakter
  const maxProjectChars = 160; // batasan maksimal karakter
  const [selectedCategory, setSelectedCategory] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [canClick, setCanClick] = useState(false);
  const router = useRouter(); // Gunakan useRouter

  const handleInputNameChange = (e) => {
    const { value } = e.target;
    if (value.length <= maxNameChars) {
      setselectedMaxNamaLengkap(value);
    }
  };

  const handleInputNameSchoolChange = (e) => {
    const { value } = e.target;
    if (value.length <= maxSchoolChars) {
      setselectedNamaSekolah(value);
    }
  };

  const handleInputProjectChange = (e) => {
    const { value } = e.target;
    if (value.length <= maxProjectChars) {
      setselectedMaxProject(value);
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    
    // Logika untuk menentukan harga berdasarkan kategori yang dipilih
    switch (value) {
      case "Indonesia International IoT Olympiad - Offline Competition":
        break;
      case "Indonesia International IoT Olympiad - Offline Competition + Excursion":
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const termsAccepted = sessionStorage.getItem("termsAccepted");

    if (!termsAccepted) {
      alert("You must accept the Terms & Conditions first.");
      router("/registration/homeindo"); // Navigasi ke halaman HomeIndo
    }
  }, [router]);

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbwBWQW-mjgpe9JIVtd94Wa2A6abhchn-iw2rw1UJ5Gd-o9M_8D9-DoNM-6CStLATmMd/exec";

    useEffect(() => {
      const form = document.forms["regist-form"];
  
      if (form) {
        const handleSubmit = async (e) => {
          e.preventDefault();
          setShowModal(true);
          setCanClick(false);
          setCountdown(5); // Set ulang countdown saat modal muncul
  
          let count = 5;
          const interval = setInterval(() => {
            count -= 1;
            setCountdown(count);
  
            if (count <= 1) {
              clearInterval(interval); // Hentikan countdown di angka 1
              setCanClick(true);
            }
          }, 1000);
        };
  
        form.addEventListener("submit", handleSubmit);
        return () => {
          form.removeEventListener("submit", handleSubmit);
        };
      }
    }, []);
  const handleConfirmSubmit = async () => {
    setShowModal(false); // Tutup modal
    const form = document.forms["regist-form"];
  
    if (!form) return;
  
    setIsLoading(true);
    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: new FormData(form),
      });
  
      if (response.ok) {
        setStatusMessage("Successfully submitted data!");
        
        // Ambil data sebelum reset
        const formData = {
          namaLengkap: selectedMaxNamaLengkap,
          projectTitle: selectedMaxProject,
          category: selectedCategory,
          namasekolah: selectedNamaSekolah,
        };
  
        form.reset();
        setTimeout(() => {
          router.push(
            `/registration/thankyouindo?namaLengkap=${encodeURIComponent(selectedMaxNamaLengkap)}
            &projectTitle=${encodeURIComponent(selectedMaxProject)}
            &category=${encodeURIComponent(selectedCategory)}
            &namasekolah=${encodeURIComponent(selectedNamaSekolah)}`
          );
        }, 1000);
      } else {
        setStatusMessage("An error occurred while submitting the data.");
      }
    } catch (error) {
      setStatusMessage("An error occurred while submitting the data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="registration-section">
        <div class="container">
          <div class="content">
            <div class="sub">REGISTRATION FORM</div>
            <h1 class="garis-bawah"></h1>
            <br />
            <br />
            <h4 className="text-xl">
              HELLO I3O 2026 PARTICIPANTS, Please pay attention to the following information before filling out the registration form :
            </h4>
            <br />
            <p>
              1. Please fill in the required data correctly and ensure there are no typos. Also, make sure that the data submitted is final and does not undergo any changes.
            </p>
            <p>
              2. After ensuring the data is correct, you can click the <span className="fw-bold"> &quot;SUBMIT&quot;</span> button only once. If the data has been successfully submitted, you will be redirected to another page.
            </p>
            <p>
              3. There will be an information email that the registration has been received which is sent to the team leader&#39;s email address, and the documents will be validated by our team. Please be patient and wait a maximum of 3 days after the registration time, the Letter of Acceptance (LOA) will be sent to the team leader&#39;s email address.
            </p>
            <br />
            {showModal && (
              <div className="modal-overlay-submit">
                <div className="modal-submit text-lg-center text-md-center">
                  <h2 className="text-center">⚠️ATTENTION!</h2>
                  <p>
                    Data that has been sent cannot be changed again. The committee will use the last data entered for certificate printing.
                    <br />
                    <b>MAKE SURE ALL DATA IS CORRECT!</b>
                    <br />
                    <b>
                      DO NOT REGISTER AGAIN WITH THE SAME DATA MULTIPLE TIMES!
                    </b>
                  </p>
                  <div className="modal-buttons-submit">
                    <button onClick={() => setShowModal(false)}>Cancel</button>
                    <button
                      onClick={handleConfirmSubmit}
                      disabled={!canClick || isLoading}
                    >
                      {isLoading
                        ? "Sending..."
                        : canClick
                        ? "Continue"
                        : `Wait... ${countdown}`}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <form name="regist-form">
              <h1 className="text-sm md:text-lg lg:text-5xl">BIODATA</h1>
              <h1 className="garis-bawah"></h1>
              <div className="user-details">
                <div className="input-box">
                  <label className="form-label" value="Peserta Indonesia">
                    Participant Category
                  </label>
                  <input
                    type="text"
                    id="CATEGORY_PARTICIPANT"
                    name="CATEGORY_PARTICIPANT"
                    className="form-control"
                    placeholder="Choose Categories Participant"
                    value="PESERTA INDONESIA"
                    readOnly
                  />
                </div>
                <div class="input-box">
                  <label for="CATEGORY_COMPETITION" class="form-label">
                    Category Competition
                  </label>
                  <select
                    type="text"
                    id="CATEGORY_COMPETITION"
                    name="CATEGORY_COMPETITION"
                    class="form-control"
                    placeholder="Choose Category Competition "
                    onChange={handleCategoryChange}
                    required
                  >
                    <option value="">--Choose Category Competition--</option>
                    <option value="Indonesia International IoT Olympiad - Offline Competition">
                      Offline Competition
                    </option>
                    <option value="Indonesia International IoT Olympiad - Offline Competition + Excursion">
                      Offline Competition + Excursion
                    </option>
                  </select>
                </div>
              </div>

              <div className="user-details">
                <div className="input-box">
                  <label htmlFor="NAMA_LENGKAP" className="form-label">
                    Leader & Member Name
                  </label>
                  <label>
                    <p>
                      Input the name of the leader and team members with the team leader's name first, in the following format :
                    </p>
                    <p>Note : maximum 5 members + 1 team leader</p>
                    <h6>Kamal Putra</h6>
                    <h6>Ranu Ramadhan</h6>
                    <h6>Irsyad Zaidan</h6>
                  </label>
                  <textarea
                    type="text"
                    id="NAMA_LENGKAP"
                    name="NAMA_LENGKAP"
                    className="form-control"
                    placeholder="Input Leader & Member Name"
                    required
                    value={selectedMaxNamaLengkap}
                    onChange={handleInputNameChange}
                  ></textarea>
                  <p>
                    {selectedMaxNamaLengkap.length} / {maxNameChars} character
                  </p>
                </div>
                <div className="input-box">
                  <label htmlFor="LEADER_WHATSAPP" className="form-label">
                    Leader's WhatsApp Number
                  </label>
                  <label>
                    <p>
                      Please write with the phone code, example: (country code) (phone number) +62 81770914xxxx
                    </p>
                    <p>
                      Note: Please fill in the team leader's number correctly, to be entered into the WhatsApp group
                    </p>
                  </label>
                  <input
                    type="number"
                    id="LEADER_WHATSAPP"
                    name="LEADER_WHATSAPP"
                    className="form-control"
                    placeholder="Input Leader's WhatsApp Number"
                    required
                  />
                </div>
                <div class="input-box">
                  <label for="LEADER_EMAIL" class="form-label">
                    Leader's Email Address
                  </label>
                  <label>
                    <p>
                      Notes : Please fill in the email correctly, the LOA will be sent via the filled team leader's email address.
                    </p>
                  </label>
                  <input
                    type="email"
                    id="LEADER_EMAIL"
                    name="LEADER_EMAIL"
                    class="form-control"
                    placeholder="Input Your Leader Email Address"
                    required
                  />
                </div>
                <div className="input-box">
                  <label for="NISN_NIM" className="form-label">
                    Leader & Member NISN / NIM
                  </label>
                  <label>
                    <p>
                      Notes : Input NISN / NIM according to the order of the names of the leader and team members, in the following format :
                    </p>
                    <h6>231700</h6>
                    <h6>241700</h6>
                    <h6>251700</h6>
                  </label>
                  <textarea
                    type="text"
                    id="NISN_NIM"
                    name="NISN_NIM"
                    className="form-control"
                    placeholder="Input Leader & Member NISN / NIM"
                    required
                  ></textarea>
                </div>
              </div>

              {/* DATA SEKOLAH START */}
              {/* DATA SEKOLAH START */}
              <h1 className="text-sm md:text-lg lg:text-5xl">SCHOOL DATA</h1>
              <h1 className="garis-bawah"></h1>
              <div className="user-details">
                <div className="input-box">
                  <label htmlFor="NAMA_SEKOLAH" className="form-label">
                    School/University Name
                  </label>
                  <label>
                    <p>
                      Notes : Enter the name of the school in accordance with the order of the names of the leader and team members from their respective schools, in the following format :
                    </p>
                    <h6>SMA CERIA</h6>
                    <h6>SMA BAHAGIA</h6>
                    <h6>SMA TADIKA MESRA</h6>
                  </label>
                  <textarea
                    type="text"
                    id="NAMA_SEKOLAH"
                    name="NAMA_SEKOLAH"
                    className="form-control"
                    placeholder="Input School/University Name"
                    required
                    value={selectedNamaSekolah}
                    onChange={handleInputNameSchoolChange}
                  ></textarea>
                  <p>
                    {selectedNamaSekolah.length} / {maxSchoolChars} character
                  </p>
                </div>
                <div className="input-box">
                  <label for="NPSN" className="form-label">
                    Nomor Pokok Sekolah Nasional (NPSN)
                  </label>
                  <label>
                    <p>
                      Notes : Enter the NPSN if you are still in school according to the order of the names of the leader and team members, in the following format :
                    </p>
                    <h6>1201301</h6>
                    <h6>1302402</h6>
                    <h6>1020100</h6>
                  </label>
                  <textarea
                    type="number"
                    id="NPSN"
                    name="NPSN"
                    className="form-control"
                    placeholder="Input Nomor Pokok Sekolah Nasional (NPSN)"
                  ></textarea>
                </div>
                <div className="input-box">
                  <label for="GRADE" className="form-label">
                    Level of Education{" "}
                  </label>
                  <select
                    type="text"
                    id="GRADE"
                    name="GRADE"
                    className="form-control"
                    placeholder="Choose Grade"
                    required
                  >
                    <option value="">--Choose Level of Education--</option>
                    <option value="Sekolah Dasar">Elementary School</option>
                    <option value="Sekolah Menengah Pertama">
                      Junior High School
                    </option>
                    <option value="Sekolah Menengah Atas">
                      Senior High School
                    </option>
                    <option value="Universitas">University</option>
                  </select>
                </div>
                <div className="input-box">
                  <label for="PROVINCE" className="form-label">
                    Province
                  </label>
                  <input
                    type="text"
                    id="PROVINCE"
                    name="PROVINCE"
                    className="form-control"
                    placeholder="Input Your Province"
                    required
                  />
                </div>
              </div>
              {/* DATA SEKOLAH END */}
              {/* DATA SEKOLAH END */}

              {/* DATA PEMBIMBING START */}
              {/* DATA PEMBIMBING START */}
              <h1 className="text-sm md:text-lg lg:text-5xl">
                SUPERVISOR DATA
              </h1>
              <h1 className="garis-bawah"></h1>
              <div className="user-details">
                <div class="input-box">
                  <label for="NAME_SUPERVISOR" class="form-label">
                    Teacher/Supervisor Name
                  </label>
                  <textarea
                    type="text"
                    id="NAME_SUPERVISOR"
                    name="NAME_SUPERVISOR"
                    class="form-control"
                    placeholder="Input Teacher/Supervisor Name"
                    required
                  ></textarea>
                </div>

                <div className="input-box">
                  <label
                    for="WHATSAPP_NUMBER_SUPERVISOR"
                    className="form-label"
                  >
                    Teacher/Supervisor WhatsApp Number
                  </label>
                  <label>
                    <p>
                      Please write with the phone code, example: (country code) (phone number) +62 81770914xxxx
                    </p>
                  </label>
                  <input
                    type="number"
                    id="WHATSAPP_NUMBER_SUPERVISOR"
                    name="WHATSAPP_NUMBER_SUPERVISOR"
                    className="form-control"
                    placeholder="Input Teacher/Supervisor WhatsApp Number"
                    required
                  />
                </div>

                <div className="input-box">
                  <label for="EMAIL_TEACHER_SUPERVISOR" className="form-label">
                    Teacher/Supervisor Email Address
                  </label>
                  <input
                    type="email"
                    id="EMAIL_TEACHER_SUPERVISOR"
                    name="EMAIL_TEACHER_SUPERVISOR"
                    className="form-control"
                    placeholder="Input Teacher/Supervisor Email Address"
                    required
                  />
                </div>
              </div>
              {/* DATA PEMBIMBING END */}
              {/* DATA PEMBIMBING END */}

              {/* DETAIL PROJECT START */}
              {/* DETAIL PROJECT START */}
              <div className="">
                <h1 className="text-sm md:text-lg lg:text-5xl">
                  PROJECT DETAILS
                </h1>
                <h1 className="garis-bawah"></h1>
              </div>
              <div className="user-details">
                <div className="input-box">
                  <label for="PROJECT_TITLE" className="form-label">
                    Project Title
                  </label>
                  <label>
                    <p>
                      Notes : Please fill in the project title data CORRECTLY, the data entered can no longer be changed!
                    </p>
                  </label>
                  <textarea
                    type="text"
                    id="PROJECT_TITLE"
                    name="PROJECT_TITLE"
                    className="form-control"
                    placeholder="Input Project Title"
                    required
                    value={selectedMaxProject}
                    onChange={handleInputProjectChange}
                  ></textarea>
                  <p>
                    {selectedMaxProject.length} / {maxProjectChars} character
                  </p>
                </div>

                {/* Dropdown Kategori */}
                <div className="input-box">
                  <label htmlFor="CATEGORIES" className="form-label">
                    Category
                  </label>
                  <select
                    id="CATEGORIES"
                    name="CATEGORIES"
                    className="form-control"
                    placeholder="--Choose-- "
                    required
                  >
                    <option value="">--Choose Category--</option>
                    <option value="IoT in Business">IoT in Business</option>
                    <option value="IoT in Education">IoT in Education</option>
                    <option value="IoT in Healthcare">IoT in Healthcare</option>
                    <option value="IoT in Energy and Manufacturing">
                      IoT in Energy and Manufacturing
                    </option>
                    <option value="IoT in Agriculture">
                      IoT in Agriculture
                    </option>
                    <option value="Social Science">Social Science</option>
                    <option value="Innovation Science">
                      Innovation Science
                    </option>
                    <option value="Computer Science and Robotic">
                      Computer Science and Robotic
                    </option>
                    <option value="Education">Education</option>
                    <option value="Physics, Energy and Engineering">
                      Physics, Energy and Engineering
                    </option>
                  </select>
                </div>

                <div className="input-box">
                  <label for="YES_NO" className="form-label">
                    Has the project title ever participated in previous invention and innovation competitions?
                  </label>
                  <select
                    type="text"
                    id="YES_NO"
                    name="YES_NO"
                    className="form-control"
                    placeholder="--Choose Information Resources-- "
                    required
                  >
                    <option>--Choose--</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="input-box">
                  <label
                    for="JUDUL_PERNAH_BERPATISIPASI"
                    className="form-label"
                  >
                    If the project title has ever participated in previous invention and innovation competitions, please write the name of the competition
                  </label>
                  <textarea
                    type="text"
                    id="JUDUL_PERNAH_BERPATISIPASI"
                    name="JUDUL_PERNAH_BERPATISIPASI"
                    className="form-control"
                    placeholder="Input the Name of the Competition"
                  ></textarea>
                  <div className="mt-5" id="form_alerts"></div>
                </div>
              </div>
              {/* DETAIL PROJECT END */}
              {/* DETAIL PROJECT END */}

              {/* GENERAL INFORMATION START */}
              {/* GENERAL INFORMATION START */}
              <div className="">
                <h1 className="text-sm md:text-lg lg:text-5xl">
                  GENERAL INFORMATION
                </h1>
                <h1 className="garis-bawah"></h1>
              </div>
              <div className="user-details">
                <div className="input-box">
                  <label for="COMPLETE_ADDRESS" className="form-label">
                    Complete Address
                  </label>
                  <label>
                    <p>
                      Please write the complete address (Street Name, House Number, RT&RW, District, Regency, City, Province, Postal Code)
                    </p>
                  </label>
                  <textarea
                    type="text"
                    id="COMPLETE_ADDRESS"
                    name="COMPLETE_ADDRESS"
                    className="form-control"
                    placeholder="Input Your Complete Address"
                    required
                  ></textarea>
                </div>
                <div className="input-box">
                  <label for="INFORMATION_RESOURCES" className="form-label">
                    Source of Information about I3O 2026 Competition
                  </label>
                  <select
                    type="text"
                    id="INFORMATION_RESOURCES"
                    name="INFORMATION_RESOURCES"
                    className="form-control"
                    placeholder="--Choose Information Resources-- "
                    required
                  >
                    <option value="">--Choose Information Resources--</option>
                    <option value="IYSA Instagram">IYSA Instagram</option>
                    <option value="I3O Instagram">I3O Instagram</option>
                    <option value="Pembimbing/Sekolah">Teacher/Supervisor/School</option>
                    <option value="IYSA FaceBook">IYSA FaceBook</option>
                    <option value="IYSA Linkedin">IYSA Linkedin</option>
                    <option value="IYSA Website">IYSA Website</option>
                    <option value="I3O Website">I3O Website</option>
                    <option value="IYSA Email">IYSA Email</option>
                    <option value="I3O Email">I3O Email</option>
                    <option value="Acara Sebelumnya">Previous Event</option>
                    <option value="Lainnya">Other</option>
                  </select>
                </div>
                <div className="input-box">
                  <label for="FILE" className="form-label">
                    If you received a free registration from a previous event or previous school visit, please attach documentation proof{" "}
                  </label>
                  <input
                    type="url"
                    id="FILE"
                    name="FILE"
                    className="form-control"
                    placeholder="Upload Link File Drive"
                  />
                </div>
              </div>
              {/* GENERAL INFORMATION END */}
              {/* GENERAL INFORMATION END */}

              <div className="button">
                <input type="submit" value="Submit" />
              </div>
            </form>
            {/* Loader dan Status Message */}
            {isLoading && (
              <div className="overlay-loader">
                <div className="loader"></div>
                <div>
                  {statusMessage && (
                    <p className="status-message">{statusMessage}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default IndonesiaOffline;
